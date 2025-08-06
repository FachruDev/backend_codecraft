import { Router } from 'express';
import { 
  getQAsController, 
  getQAByIdController, 
  createQAController, 
  updateQAController, 
  deleteQAController 
} from '../../controller/service/qaController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { createQASchema, updateQASchema } from '../../schemas/service/qa.schema';
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

// Get all qa
router.get('/', getQAsController);

// Get qa by id
router.get('/:id', getQAByIdController);

// Create qa
router.post('/', 
  authenticateToken, 
  validateRequest(createQASchema), 
  requirePermission([AppPermissions.QA_CREATE]), 
  createQAController
);

// Update qa
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateQASchema), 
  requirePermission([AppPermissions.QA_EDIT]), 
  updateQAController
);

// Delete qa
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.QA_DELETE]), 
  deleteQAController
);

export default router;