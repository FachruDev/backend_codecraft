import { Router } from 'express';
import { getServiceSectionData, upsertServiceSectionData } from '../../controller/service/serviceSectionController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware'; 
import { updateServiceSectionSchema } from '../../schemas/service/serviceSection.schema'; 
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

// Get all service section
router.get('/', getServiceSectionData);

// Update service section
router.put('/', 
  authenticateToken, 
  validateRequest(updateServiceSectionSchema), 
  requirePermission([AppPermissions.SERVICE_SECTION_EDIT]), 
  upsertServiceSectionData
);

export default router;