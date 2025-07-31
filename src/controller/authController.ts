import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { 
  loginSchema, 
  registerSchema, 
  refreshTokenSchema,
  LoginInput,
  RegisterInput,
  RefreshTokenInput
} from '../schemas/auth.schema';
import { z } from 'zod';

export class AuthController {
  /**
   * Register new user
   * POST /auth/register
   */
  static async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Get user agent and IP address
      const userAgent = req.get('User-Agent');
      const ipAddress = req.ip || req.socket.remoteAddress;
      
      const result = await AuthService.register(validatedData, userAgent, ipAddress);
      
      return res.status(201).json({
        success: true,
        message: 'User berhasil didaftarkan',
        data: result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Data tidak valid',
          errors: (error as any).errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Login user
   * POST /auth/login
   */
  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Get user agent and IP address
      const userAgent = req.get('User-Agent');
      const ipAddress = req.ip || req.socket.remoteAddress;
      
      const result = await AuthService.login(validatedData, userAgent, ipAddress);
      
      return res.status(200).json({
        success: true,
        message: 'Login berhasil',
        data: result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Data tidak valid',
          errors: (error as any).errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  static async refreshToken(req: Request, res: Response) {
    try {
      const validatedData = refreshTokenSchema.parse(req.body);
      const result = await AuthService.refreshToken(validatedData);
      
      return res.status(200).json({
        success: true,
        message: 'Token berhasil diperbarui',
        data: result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Data tidak valid',
          errors: (error as any).errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Logout user
   * POST /auth/logout
   */
  static async logout(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User tidak terautentikasi'
        });
      }

      // Get refresh token from request body if provided
      const { refreshToken } = req.body;
      
      await AuthService.logout(req.user.userId, refreshToken);
      
      return res.status(200).json({
        success: true,
        message: 'Logout berhasil'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Logout from all devices
   * POST /auth/logout-all
   */
  static async logoutAll(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User tidak terautentikasi'
        });
      }

      await AuthService.revokeAllTokens(req.user.userId);
      
      return res.status(200).json({
        success: true,
        message: 'Logout dari semua perangkat berhasil'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Get user's active refresh tokens
   * GET /auth/tokens
   */
  static async getUserTokens(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User tidak terautentikasi'
        });
      }

      const tokens = await AuthService.getUserRefreshTokens(req.user.userId);
      
      return res.status(200).json({
        success: true,
        message: 'Token berhasil diambil',
        data: tokens.map(token => ({
          id: token.id,
          userAgent: token.userAgent,
          ipAddress: token.ipAddress,
          issuedAt: token.issuedAt,
          expiresAt: token.expiresAt,
          createdAt: token.createdAt
        }))
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Get current user profile
   * GET /auth/me
   */
  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User tidak terautentikasi'
        });
      }

      const user = await AuthService.getUserById(req.user.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User tidak ditemukan'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Profile berhasil diambil',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          bio: user.bio,
          role: user.role,
          groups: user.groups.map(group => ({
            id: group.id,
            name: group.name,
            permissions: group.permissions.map(permission => ({
              id: permission.id,
              name: permission.name
            }))
          }))
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }

  /**
   * Verify token
   * GET /auth/verify
   */
  static async verifyToken(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Token tidak valid'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Token valid',
        data: {
          userId: req.user.userId,
          email: req.user.email,
          role: req.user.role
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
      });
    }
  }
} 