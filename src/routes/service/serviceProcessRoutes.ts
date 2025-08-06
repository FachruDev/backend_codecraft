import { Router } from 'express';
import { 
  getServiceProcessesController, 
  getServiceProcessByIdController, 
  createServiceProcessController, 
  updateServiceProcessController, 
  deleteServiceProcessController 
} from '../../controller/service/serviceProcessController';
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware'; 
import { createServiceProcessSchema, updateServiceProcessSchema } from '../../schemas/service/serviceProcess.schema'; 
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

// Get all service process
router.get('/', getServiceProcessesController);

// Get service process by id
router.get('/:id', getServiceProcessByIdController);

// Create service process
router.post('/', 
  authenticateToken, 
  validateRequest(createServiceProcessSchema), 
  requirePermission([AppPermissions.SERVICE_PROCESS_CREATE]), 
  createServiceProcessController
);

// Update service process
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateServiceProcessSchema), 
  requirePermission([AppPermissions.SERVICE_PROCESS_EDIT]), 
  updateServiceProcessController
);

// Delete service process
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.SERVICE_PROCESS_DELETE]), 
  deleteServiceProcessController
);

export default router;