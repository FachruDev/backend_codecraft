import { Router } from 'express';
import { getPermissionsController } from '../controller/permissionController';
import { authenticateToken, requirePermission } from '../middleware/middleware';
import { Action, AppPermissions, Resources } from '../utils/permission';

const router = Router();

router.get('/', 
  authenticateToken, 
  requirePermission([AppPermissions[Resources.PERMISSION + '_' + Action.VIEW.toUpperCase()]]),
  getPermissionsController
);

export default router;