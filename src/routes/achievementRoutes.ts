import { Router } from 'express';
import { 
  getAchievementsController, 
  getAchievementByIdController, 
  createAchievementController, 
  updateAchievementController, 
  deleteAchievementController 
} from '../controller/achievementController'; 
import { authenticateToken, validateRequest, requirePermission } from '../middleware/middleware'; 
import { createAchievementSchema, updateAchievementSchema } from '../schemas/achievement.schema'; 
import { AppPermissions } from '../utils/permission'; 

const router = Router();

// Get all achievement
router.get('/', getAchievementsController);

// Get achievement by id
router.get('/:id', getAchievementByIdController);

// Create achievement
router.post('/', 
  authenticateToken, 
  validateRequest(createAchievementSchema), 
  requirePermission([AppPermissions.ACHIEVEMENT_CREATE]), 
  createAchievementController
);

// Update achievement
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateAchievementSchema), 
  requirePermission([AppPermissions.ACHIEVEMENT_EDIT]), 
  updateAchievementController
);

// Delete achievement
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.ACHIEVEMENT_DELETE]), 
  deleteAchievementController
);

export default router;