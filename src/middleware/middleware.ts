import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { AuthService, TokenPayload } from '../services/authService';
import { Group, Permission, PrismaClient, Prisma } from '@prisma/client';

const WINDOWS_MS = parseInt(process.env.WINDOWS_MS_TIME || '900000', 10); 
const WINDOWS_LIMIT = parseInt(process.env.WINDOWS_MS_LIMIT || '100', 10); 
const IP_LIMIT = parseInt(process.env.IP_LIMIT || '10', 10);

const prisma = new PrismaClient();

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: WINDOWS_MS, 
  max: WINDOWS_LIMIT,
  message: {
    error: 'Terlalu banyak request dari IP ini, silakan coba lagi dalam 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login rate limiter (more strict)
export const loginRateLimiter = rateLimit({
  windowMs: WINDOWS_MS, 
  max: IP_LIMIT, 
  message: {
    error: 'Terlalu banyak percobaan login, silakan coba lagi dalam 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security middleware
export const securityMiddleware = [
  helmet(),
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  }),
];

// Authentication middleware
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan',
        error: 'UNAUTHORIZED'
      });
    }

    try {
      const decoded = AuthService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah kadaluarsa',
        error: 'INVALID_TOKEN'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      try {
        const decoded = AuthService.verifyToken(token);
        req.user = decoded;
      } catch (error) {
        // Token invalid, but continue without user
        req.user = undefined;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

// Role-based authorization middleware
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak',
        error: 'UNAUTHORIZED'
      });
    }

    if (!req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki izin untuk mengakses resource ini',
        error: 'FORBIDDEN'
      });
    }

    next();
  };
};

// Permission-based authorization middleware
export const requirePermission = (permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Akses ditolak',
          error: 'UNAUTHORIZED'
        });
      }

      // ✅ Definisi tipe user lengkap
      type UserWithGroupsAndPermissions = Prisma.UserGetPayload<{
        include: {
          groups: {
            include: {
              permissions: true;
            };
          };
        };
      }>;

      // ✅ Ambil user lengkap dari DB
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        include: {
          groups: {
            include: {
              permissions: true
            }
          }
        }
      }) as UserWithGroupsAndPermissions;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User tidak ditemukan',
          error: 'USER_NOT_FOUND'
        });
      }

      // ✅ TypeScript udah tau tipe-nya, gak perlu "Group" atau "Permission" manual
      const userPermissions = user.groups.flatMap(group =>
        group.permissions.map(permission => permission.name)
      );

      const hasPermission = permissions.some(permission =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: 'Anda tidak memiliki izin yang diperlukan',
          error: 'INSUFFICIENT_PERMISSIONS'
        });
      }

      next();
    } catch (error) {
      console.error(error); // good practice debug
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: 'INTERNAL_SERVER_ERROR'
      });
    }
  };
};


// Validation middleware
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); 
      next(); 
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return res.status(400).json({
          success: false,
          message: 'Data tidak valid',
          errors,
          error: 'VALIDATION_ERROR'
        });
      }

      next(error);
    }
  };
};

// Error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Handle specific error types
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      error: 'DATABASE_ERROR'
    });
  }

  if (error.name === 'PrismaClientValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      error: 'VALIDATION_ERROR'
    });
  }

  // Default error response
  return res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: 'INTERNAL_SERVER_ERROR'
  });
};

// Not found middleware
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    error: 'NOT_FOUND'
  });
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};
