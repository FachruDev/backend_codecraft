import { Router } from 'express';
import { 
  getSocialMediaController,
  getSocialMediaByIdController,
  createSocialMediaController,
  updateSocialMediaController,
  deleteSocialMediaController 
} from '../controller/socialMediaController';
import { authenticateToken, validateRequest, requirePermission } from '../middleware/middleware';
import { createSocialMediaSchema, updateSocialMediaSchema } from '../schemas/socialMedia.schema'; 
import { AppPermissions } from '../utils/permission';

const router = Router();

// Get all social media
router.get('/', getSocialMediaController);

// Get social media by id
router.get('/:id', getSocialMediaByIdController);

// Create social media
router.post('/',
  authenticateToken,
  validateRequest(createSocialMediaSchema),
  requirePermission([AppPermissions.SOCIAL_MEDIA_CREATE]),
  createSocialMediaController
);

// Update social media
router.put('/:id',
  authenticateToken,
  validateRequest(updateSocialMediaSchema),
  requirePermission([AppPermissions.SOCIAL_MEDIA_EDIT]),
  updateSocialMediaController
);

// Delete social media
router.delete('/:id',
  authenticateToken,
  requirePermission([AppPermissions.SOCIAL_MEDIA_DELETE]),
  deleteSocialMediaController
);

export default router;