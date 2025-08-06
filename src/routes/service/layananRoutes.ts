import { Router } from 'express';
import {
  getServicesController,
  getServiceByIdController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from '../../controller/service/layananController'; 
import {
  authenticateToken,
  validateRequest,
  requirePermission,
} from '../../middleware/middleware';
import {
  createServiceSchema,
  updateServiceSchema,
} from '../../schemas/service/service.schema';
import { AppPermissions } from '../../utils/permission';

const router = Router();

// Get all services
router.get(
  '/',
  getServicesController
);

// Get service by id
router.get(
  '/:id',
  getServiceByIdController
);

// Create new service
router.post(
  '/',
  authenticateToken,
  validateRequest(createServiceSchema),
  requirePermission([AppPermissions.SERVICE_CREATE]), 
  createServiceController
);

// Update service
router.put(
  '/:id',
  authenticateToken,
  validateRequest(updateServiceSchema),
  requirePermission([AppPermissions.SERVICE_EDIT]), 
  updateServiceController
);

// Delete service
router.delete(
  '/:id',
  authenticateToken,
  requirePermission([AppPermissions.SERVICE_DELETE]), 
  deleteServiceController
);

export default router;
