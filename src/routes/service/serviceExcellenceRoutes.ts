import { Router } from 'express';
import { 
  getServiceExcellencesController, 
  getServiceExcellenceByIdController, 
  createServiceExcellenceController, 
  updateServiceExcellenceController, 
  deleteServiceExcellenceController 
} from '../../controller/service/serviceExcellenceController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { createServiceExcellenceSchema, updateServiceExcellenceSchema } from '../../schemas/service/serviceExcellence.schema'; 
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

// Get all service excellence
router.get('/', getServiceExcellencesController);

// Get service excellence by id
router.get('/:id', getServiceExcellenceByIdController);

// Create service excellence
router.post('/', 
  authenticateToken, 
  validateRequest(createServiceExcellenceSchema), 
  requirePermission([AppPermissions.SERVICE_EXCELLENCE_CREATE]), 
  createServiceExcellenceController
);

// Update service excellence
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateServiceExcellenceSchema), 
  requirePermission([AppPermissions.SERVICE_EXCELLENCE_EDIT]), 
  updateServiceExcellenceController
);

// Delete service excellence
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.SERVICE_EXCELLENCE_DELETE]), 
  deleteServiceExcellenceController
);

export default router;