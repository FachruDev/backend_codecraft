import { Router } from 'express';
import {
  getSeoMetadataController,
  getSeoMetadataByIdController,
  createSeoMetadataController,
  updateSeoMetadataController,
  deleteSeoMetadataController,
} from '../controller/seoMetadataController'; 
import { authenticateToken, validateRequest, requirePermission } from '../middleware/middleware'; 
import { createSeoMetadataSchema, updateSeoMetadataSchema } from '../schemas/seoMetadata.schema';
import { AppPermissions } from '../utils/permission'; 

const router = Router();

// Get all seo metadata
router.get('/', getSeoMetadataController);

// Get seometadata by id
router.get('/:id', getSeoMetadataByIdController);

// Create seometadata
router.post(
  '/',
  authenticateToken,
  validateRequest(createSeoMetadataSchema),
  requirePermission([AppPermissions.SEO_METADATA_CREATE]),
  createSeoMetadataController
);

// Update seometadata
router.put(
  '/:id',
  authenticateToken,
  validateRequest(updateSeoMetadataSchema),
  requirePermission([AppPermissions.SEO_METADATA_EDIT]),
  updateSeoMetadataController
);

// Delete seometadata
router.delete(
  '/:id',
  authenticateToken,
  requirePermission([AppPermissions.SEO_METADATA_DELETE]),
  deleteSeoMetadataController
);

export default router;