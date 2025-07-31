import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { 
  authenticateToken, 
  loginRateLimiter, 
  rateLimiter,
  validateRequest 
} from '../middleware/middleware';
import { 
  loginSchema, 
  registerSchema, 
  refreshTokenSchema 
} from '../schemas/auth.schema';

const router = Router();

// Public routes (no authentication required)
router.post('/register', 
  rateLimiter,
  validateRequest(registerSchema),
  AuthController.register
);

router.post('/login', 
  loginRateLimiter,
  validateRequest(loginSchema),
  AuthController.login
);

router.post('/refresh', 
  rateLimiter,
  validateRequest(refreshTokenSchema),
  AuthController.refreshToken
);

// Protected routes (authentication required)
router.post('/logout', 
  authenticateToken,
  AuthController.logout
);

router.post('/logout-all', 
  authenticateToken,
  AuthController.logoutAll
);

router.get('/tokens', 
  authenticateToken,
  AuthController.getUserTokens
);

router.get('/me', 
  authenticateToken,
  AuthController.getProfile
);

router.get('/verify', 
  authenticateToken,
  AuthController.verifyToken
);

export default router;
