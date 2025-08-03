import { Router } from 'express';
import { getContactSectionData, upsertContactSectionData } from '../../controller/singleton/contactSectionController';
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware'; 
import { updateContactSectionSchema } from '../../schemas/singleton/contactSection.schema'; 
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

router.get('/', getContactSectionData);

router.put('/', 
  authenticateToken, 
  validateRequest(updateContactSectionSchema), 
  requirePermission([AppPermissions.CONTACT_SECTION_EDIT]), 
  upsertContactSectionData
);

export default router;