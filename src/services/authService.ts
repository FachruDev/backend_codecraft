import bcrypt from 'bcryptjs';
import { LoginInput, RegisterInput, RefreshTokenInput } from '../schemas/auth.schema';
import jwt, { SignOptions } from 'jsonwebtoken';
import prisma from '../utils/prisma';

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN: string = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface TokenPayload {
  userId: number;
  email: string;
  role?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    profile?: string;
    bio?: string;
    role?: string;
    groups: Array<{
      id: number;
      name: string;
      permissions: Array<{
        id: number;
        name: string;
      }>;
    }>;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  /**
   * Register new user
   */
  static async register(data: RegisterInput, userAgent?: string, ipAddress?: string): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user with transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          profile: data.profile,
          bio: data.bio,
          role: data.role || 'user',
        }
      });

      // Connect user to groups if provided
      if (data.groupIds && data.groupIds.length > 0) {
        await tx.user.update({
          where: { id: newUser.id },
          data: {
            groups: {
              connect: data.groupIds.map(id => ({ id }))
            }
          }
        });
      }

      return newUser;
    });

    // Get user with groups and permissions
    const userWithGroups = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        groups: {
          include: {
            permissions: true
          }
        }
      }
    });

    if (!userWithGroups) {
      throw new Error('Gagal membuat user');
    }

    // Generate tokens
    const { accessToken, refreshToken, expiresIn } = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role || undefined
    }, userAgent, ipAddress);

    return {
      user: {
        id: userWithGroups.id,
        name: userWithGroups.name,
        email: userWithGroups.email,
        profile: userWithGroups.profile || undefined,
        bio: userWithGroups.bio || undefined,
        role: userWithGroups.role || undefined,
        groups: userWithGroups.groups.map(group => ({
          id: group.id,
          name: group.name,
          permissions: group.permissions.map(permission => ({
            id: permission.id,
            name: permission.name
          }))
        }))
      },
      accessToken,
      refreshToken,
      expiresIn
    };
  }

  /**
   * Login user
   */
  static async login(data: LoginInput, userAgent?: string, ipAddress?: string): Promise<AuthResponse> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        groups: {
          include: {
            permissions: true
          }
        }
      }
    });

    if (!user) {
      throw new Error('Email atau password salah');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Email atau password salah');
    }

    // Generate tokens
    const { accessToken, refreshToken, expiresIn } = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role || undefined
    }, userAgent, ipAddress);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile || undefined,
        bio: user.bio || undefined,
        role: user.role || undefined,
        groups: user.groups.map(group => ({
          id: group.id,
          name: group.name,
          permissions: group.permissions.map(permission => ({
            id: permission.id,
            name: permission.name
          }))
        }))
      },
      accessToken,
      refreshToken,
      expiresIn
    };
  }

  /**
   * Refresh access token
   */
  static async refreshToken(data: RefreshTokenInput): Promise<{ accessToken: string; expiresIn: number }> {
    try {
      // Find refresh token in database
      const refreshTokenRecord = await prisma.refreshToken.findUnique({
        where: { token: data.refreshToken },
        include: {
          user: true
        }
      });

      if (!refreshTokenRecord) {
        throw new Error('Refresh token tidak ditemukan');
      }

      // Check if token is revoked
      if (refreshTokenRecord.revokedAt) {
        throw new Error('Refresh token sudah dicabut');
      }

      // Check if token is expired
      if (refreshTokenRecord.expiresAt < new Date()) {
        throw new Error('Refresh token sudah kadaluarsa');
      }

      // Verify refresh token signature
      const decoded = jwt.verify(data.refreshToken, JWT_REFRESH_SECRET) as TokenPayload;
      
      // Verify token belongs to the user in database
      if (decoded.userId !== refreshTokenRecord.userId) {
        throw new Error('Refresh token tidak valid');
      }

      // Generate new access token
      const accessToken = jwt.sign(
        {
          userId: refreshTokenRecord.user.id,
          email: refreshTokenRecord.user.email,
          role: refreshTokenRecord.user.role || undefined
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] }
      );

      return {
        accessToken,
        expiresIn: 15 * 60 
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Refresh token tidak valid');
      }
      throw error;
    }
  }

  /**
   * Verify access token
   */
  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Token tidak valid');
    }
  }

  /**
   * Generate access and refresh tokens
   */
  private static async generateTokens(
    payload: TokenPayload, 
    userAgent?: string, 
    ipAddress?: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] }); // <-- PERUBAHAN DI SINI
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] }); // <-- PERUBAHAN DI SINI

    // Calculate expiration time
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt,
        userAgent: userAgent || null,
        ipAddress: ipAddress || null
      }
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60 
    };
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        groups: {
          include: {
            permissions: true
          }
        }
      }
    });
  }

  /**
   * Logout (revoke refresh token)
   */
  static async logout(userId: number, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      // Revoke specific refresh token
      await prisma.refreshToken.updateMany({
        where: {
          token: refreshToken,
          userId: userId,
          revokedAt: null
        },
        data: {
          revokedAt: new Date()
        }
      });
    } else {
      // Revoke all refresh tokens for the user
      await prisma.refreshToken.updateMany({
        where: {
          userId: userId,
          revokedAt: null
        },
        data: {
          revokedAt: new Date()
        }
      });
    }

    console.log(`User ${userId} logged out`);
  }

  /**
   * Get all active refresh tokens for a user
   */
  static async getUserRefreshTokens(userId: number) {
    return await prisma.refreshToken.findMany({
      where: {
        userId: userId,
        revokedAt: null,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  /**
   * Revoke all refresh tokens for a user (force logout from all devices)
   */
  static async revokeAllTokens(userId: number): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: {
        userId: userId,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });

    console.log(`All tokens revoked for user ${userId}`);
  }

  /**
   * Clean up expired refresh tokens
   */
  static async cleanupExpiredTokens(): Promise<number> {
    const result = await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });

    console.log(`Cleaned up ${result.count} expired refresh tokens`);
    return result.count;
  }
} 