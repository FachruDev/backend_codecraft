import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { AuthService } from '../services/authService';
import { PrismaClient, Prisma } from '@prisma/client';
import NodeCache from 'node-cache';

const WINDOWS_MS = parseInt(process.env.WINDOWS_MS_TIME || '900000', 10); 
const WINDOWS_LIMIT = parseInt(process.env.WINDOWS_MS_LIMIT || '100', 10); 
const IP_LIMIT = parseInt(process.env.IP_LIMIT || '10', 10);

// ✅ Singleton pattern untuk Prisma
class PrismaManager {
  private static instance: PrismaClient;
  
  public static getInstance(): PrismaClient {
    if (!PrismaManager.instance) {
      PrismaManager.instance = new PrismaClient();
    }
    return PrismaManager.instance;
  }
}

const prisma = PrismaManager.getInstance();

// ✅ Cache untuk permissions (TTL 5 menit)
const permissionCache = new NodeCache({ 
  stdTTL: 300, // 5 menit
  checkperiod: 60 // check for expired keys every 60 seconds
});

// ✅ Type definitions untuk database structures (based on your schema)
interface UserPermission {
  name: string;
}

interface UserGroup {
  permissions: UserPermission[];
}

interface UserWithPermissions {
  groups: UserGroup[];
}

// ✅ Prisma type definition that matches your schema
type UserWithGroupsAndPermissions = Prisma.UserGetPayload<{
  include: {
    groups: {
      include: {
        permissions: true;
      };
    };
  };
}>;

// ✅ Custom TokenPayload interface (matches your Int ID schema)
interface CustomTokenPayload {
  userId: number; // Matches your Int @id @default(autoincrement())
  role?: string;
  [key: string]: any;
}

// Extend Express Request to include user with proper typing
declare global {
  namespace Express {
    interface Request {
      user?: CustomTokenPayload;
    }
  }
}

// ✅ Optimized error responses (reusable)
const errorResponses = {
  unauthorized: {
    success: false,
    message: 'Akses ditolak',
    error: 'UNAUTHORIZED'
  },
  forbidden: {
    success: false,
    message: 'Anda tidak memiliki izin untuk mengakses resource ini',
    error: 'FORBIDDEN'
  },
  invalidToken: {
    success: false,
    message: 'Token tidak valid atau sudah kadaluarsa',
    error: 'INVALID_TOKEN'
  },
  serverError: {
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: 'INTERNAL_SERVER_ERROR'
  }
} as const;

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: WINDOWS_MS, 
  max: WINDOWS_LIMIT,
  message: {
    error: 'Terlalu banyak request dari IP ini, silakan coba lagi dalam 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // ✅ Skip successful requests untuk mengurangi memory usage
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
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
  // ✅ Skip successful requests for login (only count failures)
  skipSuccessfulRequests: true,
});

// Security middleware
export const securityMiddleware = [
  helmet({
    // ✅ Customize helmet untuk performa lebih baik
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
    crossOriginEmbedderPolicy: false
  }),
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    // ✅ Optimize CORS untuk production
    optionsSuccessStatus: 200,
    preflightContinue: false
  }),
];

// ✅ Helper function untuk get user permissions dengan caching
// Optimized for your many-to-many relationship schema
async function getUserPermissions(userId: number): Promise<string[]> {
  const cacheKey = `user_permissions_${userId}`;
  
  // Check cache first
  const cachedPermissions = permissionCache.get<string[]>(cacheKey);
  if (cachedPermissions) {
    return cachedPermissions;
  }

  try {
    // Query sesuai dengan schema many-to-many Anda
    const user = await prisma.user.findUnique({
      where: { 
        id: userId // Int ID dari schema Anda
      },
      select: {
        groups: {
          select: {
            permissions: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      console.warn(`User with ID ${userId} not found`);
      return [];
    }

    // Extract permissions dari many-to-many relationship
    const permissions: string[] = user.groups.flatMap((group: UserGroup) =>
      group.permissions.map((permission: UserPermission) => permission.name)
    );

    // Remove duplicates (jika user punya multiple groups dengan permission sama)
    const uniquePermissions = [...new Set(permissions)];

    // Cache the result
    permissionCache.set(cacheKey, uniquePermissions);
    
    return uniquePermissions;
  } catch (error) {
    console.error(`Error fetching permissions for user ${userId}:`, error);
    return [];
  }
}

// ✅ Optimized authentication middleware
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // ✅ Optional chaining

    if (!token) {
      return res.status(401).json(errorResponses.unauthorized);
    }

    const decoded = AuthService.verifyToken(token) as CustomTokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return res.status(401).json(errorResponses.invalidToken);
    }
    return res.status(401).json(errorResponses.invalidToken);
  }
};

// ✅ Optimized optional authentication
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (token) {
    try {
      req.user = AuthService.verifyToken(token) as CustomTokenPayload;
    } catch (error) {
      // Silently fail for optional auth
      req.user = undefined;
    }
  }
  
  next();
};

// ✅ Optimized role-based authorization
export const requireRole = (roles: string[]) => {
  // ✅ Convert to Set for O(1) lookup
  const roleSet = new Set(roles);
  
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roleSet.has(req.user.role)) {
      return res.status(req.user ? 403 : 401).json(
        req.user ? errorResponses.forbidden : errorResponses.unauthorized
      );
    }
    next();
  };
};

// ✅ Highly optimized permission-based authorization
export const requirePermission = (permissions: string[]) => {
  // ✅ Convert to Set for O(1) lookup
  const permissionSet = new Set(permissions);
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json(errorResponses.unauthorized);
      }

      // ✅ Use cached permission lookup with proper type handling
      const userPermissions = await getUserPermissions(req.user.userId);
      
      // ✅ Efficient permission check using Set with explicit typing
      const hasPermission = userPermissions.some((permission: string) => 
        permissionSet.has(permission)
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
      console.error('Permission check error:', error);
      return res.status(500).json(errorResponses.serverError);
    }
  };
};

// ✅ Optimized validation middleware dengan better error handling
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map(err => ({
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

// ✅ Enhanced error handling dengan lebih banyak error types
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error details:', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  // Handle specific Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    
    // Handle unique constraint violations
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Data sudah ada',
        error: 'DUPLICATE_ERROR'
      });
    }
    
    // Handle foreign key constraint violations
    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Referensi data tidak valid',
        error: 'FOREIGN_KEY_ERROR'
      });
    }
  }

  if (error.name === 'PrismaClientValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      error: 'VALIDATION_ERROR'
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json(errorResponses.invalidToken);
  }

  // Default error response
  return res.status(500).json(errorResponses.serverError);
};

// Not found middleware
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    error: 'NOT_FOUND'
  });
};

// ✅ Optimized request logging dengan conditional logging
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // ✅ Skip logging untuk health checks dan static files
  if (req.path === '/health' || req.path.startsWith('/static/')) {
    return next();
  }

  const start = process.hrtime.bigint();
  
  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
    
    // ✅ Only log in development or errors in production
    if (process.env.NODE_ENV === 'development' || res.statusCode >= 400) {
      console.log(
        `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration.toFixed(2)}ms`
      );
    }
  });
  
  next();
};

// ✅ Cache cleanup function (call this periodically or on app shutdown)
export const clearPermissionCache = (userId?: number) => {
  if (userId) {
    permissionCache.del(`user_permissions_${userId}`);
  } else {
    permissionCache.flushAll();
  }
};

// ✅ Graceful shutdown untuk cleanup resources
export const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  permissionCache.flushAll();
  await prisma.$disconnect();
  process.exit(0);
};