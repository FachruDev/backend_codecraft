import { Router } from 'express';
import { getWhyWeData, upsertWhyWeData } from '../../controller/singleton/whyWeController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { updateWhyWeSchema } from '../../schemas/singleton/whyWe.schema';
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

router.get('/', getWhyWeData);

router.put('/', 
  authenticateToken, 
  validateRequest(updateWhyWeSchema), 
  requirePermission([AppPermissions.WHY_WE_EDIT]), 
  upsertWhyWeData
);

export default router;