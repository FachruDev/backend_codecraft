import { Router } from 'express';
import {
  updateSelfController,
  deleteSelfController
} from '../controller/userController';
import {
  authenticateToken,
  validateRequest
} from '../middleware/middleware';
import { updateUserSchema } from '../schemas/user.schema';

const router = Router();

// Route for Regular Users (Self-Managed)
// Updates the profile of the currently logged-in user
router.put(
    '/me', 
    authenticateToken, 
    validateRequest(updateUserSchema), 
    updateSelfController
  );
  
// Deletes the currently logged in user account
router.delete(
    '/me', 
    authenticateToken, 
    deleteSelfController
);
  
export default router;
