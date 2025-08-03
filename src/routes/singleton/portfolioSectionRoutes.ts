import { Router } from 'express';
import { getPortfolioSectionData, upsertPortfolioSectionData } from '../../controller/singleton/portfolioSectionController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { updatePortfolioSectionSchema } from '../../schemas/singleton/portfolioSection.schema'; 
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

router.get('/', getPortfolioSectionData);

router.put('/', 
  authenticateToken, 
  validateRequest(updatePortfolioSectionSchema), 
  requirePermission([AppPermissions.PORTFOLIO_SECTION_EDIT]),
  upsertPortfolioSectionData
);

export default router;