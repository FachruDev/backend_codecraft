import { Router } from 'express';
import { getPermissionsController } from '../controller/permissionController';
import { authenticateToken, requirePermission } from '../middleware/middleware';
import { AppPermissions } from '../utils/permission';

const router = Router();

router.get('/', 
  authenticateToken, 
  requirePermission([AppPermissions.PERMISSION_VIEW]), 
  getPermissionsController
);

export default router;