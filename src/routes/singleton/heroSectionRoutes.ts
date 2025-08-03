import { Router } from 'express';
import { getHeroSectionData, upsertHeroSectionData } from '../../controller/singleton/heroSectionController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { updateHeroSectionSchema } from '../../schemas/singleton/heroSection.schema'; 
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

router.get('/', getHeroSectionData);

router.put('/', 
  authenticateToken, 
  validateRequest(updateHeroSectionSchema), 
  requirePermission([AppPermissions.HERO_SECTION_EDIT]), 
  upsertHeroSectionData
);

export default router;