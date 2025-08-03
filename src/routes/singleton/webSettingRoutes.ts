import { Router } from 'express';
import { getWebSettingData, upsertWebSettingData } from '../../controller/singleton/webSettingController';
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { updateWebSettingSchema } from '../../schemas/singleton/webSetting.schema';
import { AppPermissions } from '../../utils/permission';

const router = Router();

router.get('/', getWebSettingData);

router.put('/', 
  authenticateToken, 
  validateRequest(updateWebSettingSchema), 
  requirePermission([AppPermissions.WEB_SETTING_EDIT]), 
  upsertWebSettingData
);

export default router;