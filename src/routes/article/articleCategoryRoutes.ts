import { Router } from 'express';
import { 
  getArticleCategoriesController, 
  getArticleCategoryByIdController, 
  createArticleCategoryController, 
  updateArticleCategoryController, 
  deleteArticleCategoryController 
} from '../../controller/article/articleCategoryController';
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware'; 
import { createArticleCategorySchema, updateArticleCategorySchema } from '../../schemas/article/articleCategory.schema'; 
import { AppPermissions } from '../../utils/permission';

const router = Router();

// Get all article category
router.get('/', getArticleCategoriesController);

// Get article category by id

router.get('/:id', getArticleCategoryByIdController);

// Create article category
router.post('/', 
  authenticateToken, 
  validateRequest(createArticleCategorySchema), 
  requirePermission([AppPermissions.ARTICLE_CATEGORY_CREATE]), 
  createArticleCategoryController
);

// Update article category
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateArticleCategorySchema), 
  requirePermission([AppPermissions.ARTICLE_CATEGORY_EDIT]), 
  updateArticleCategoryController
);

// Delete article category
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.ARTICLE_CATEGORY_DELETE]), 
  deleteArticleCategoryController
);

export default router;