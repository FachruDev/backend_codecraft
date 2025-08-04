import { Router } from 'express';
import { 
  getUsersController, 
  getUserByIdController, 
  createUserController, 
  updateUserController, 
  deleteUserController,
} from '../controller/userController'; 
import { 
  authenticateToken, 
  validateRequest, 
  requirePermission 
} from '../middleware/middleware'; 
import { createUserSchema, updateUserSchema } from '../schemas/user.schema'; 
import { AppPermissions } from '../utils/permission'; 

const router = Router();

// Routes for Admin (need special permission)
// Get a list of all users
router.get(
  '/', 
  authenticateToken, 
  requirePermission([AppPermissions.USER_VIEW]), 
  getUsersController
);

// Get user by ID
router.get(
  '/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.USER_VIEW]), 
  getUserByIdController
);

// Create new user
router.post(
  '/', 
  authenticateToken, 
  validateRequest(createUserSchema), 
  requirePermission([AppPermissions.USER_CREATE]), 
  createUserController
);

// Update another user based on ID (for admin)
router.put(
  '/:id', 
  authenticateToken, 
  validateRequest(updateUserSchema), 
  requirePermission([AppPermissions.USER_EDIT]), 
  updateUserController
);

// Deletes another user based on ID (for admin)
router.delete(
  '/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.USER_DELETE]), 
  deleteUserController
);

export default router;
