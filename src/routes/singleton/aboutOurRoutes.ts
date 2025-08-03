import { Router } from 'express';
import { getAboutUs, upsertAboutUs } from '../../controller/singleton/aboutOurController';
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { updateAboutOurSchema } from '../../schemas/singleton/aboutOur.schema'; 
import { AppPermissions } from '../../utils/permission';

const router = Router();

router.get('/', getAboutUs);

router.put('/', 
  authenticateToken, 
  validateRequest(updateAboutOurSchema), 
  requirePermission([AppPermissions.ABOUT_OUR_EDIT]),
  upsertAboutUs
);

export default router;