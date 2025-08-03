import { Router } from 'express';
import { getContactInfo, upsertContactInfo } from '../../controller/singleton/contactInformationController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { updateContactInformationSchema } from '../../schemas/singleton/contactInformation.schema';
import { AppPermissions } from '../../utils/permission';

const router = Router();

router.get('/', getContactInfo);

router.put('/', 
  authenticateToken, 
  validateRequest(updateContactInformationSchema), 
  requirePermission([AppPermissions.CONTACT_INFORMATION_EDIT]),
  upsertContactInfo
);

export default router;