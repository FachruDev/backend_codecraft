import { Router } from 'express';
import { 
  getSubServicesController, 
  getSubServiceByIdController, 
  createSubServiceController, 
  updateSubServiceController, 
  deleteSubServiceController 
} from '../../controller/service/subServiceController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware'; 
import { createSubServiceSchema, updateSubServiceSchema } from '../../schemas/service/subService.schema'; 
import { AppPermissions } from '../../utils/permission';

const router = Router();

// Get all sub service
router.get('/', getSubServicesController);

// Get sub service by id
router.get('/:id', getSubServiceByIdController);

// Create sub service
router.post('/', 
  authenticateToken, 
  validateRequest(createSubServiceSchema), 
  requirePermission([AppPermissions.SUB_SERVICE_CREATE]), 
  createSubServiceController
);

// Update sub service
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateSubServiceSchema), 
  requirePermission([AppPermissions.SUB_SERVICE_EDIT]), 
  updateSubServiceController
);

// Delete sub service
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.SUB_SERVICE_DELETE]), 
  deleteSubServiceController
);

export default router;