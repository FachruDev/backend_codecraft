import { Router } from 'express';
import { 
  getArticlesController, 
  getArticleByIdController, 
  createArticleController, 
  updateArticleController, 
  deleteArticleController 
} from '../../controller/article/articleController'; 
import { authenticateToken, validateRequest, requirePermission } from '../../middleware/middleware';
import { createArticleSchema, updateArticleSchema } from '../../schemas/article/article.schema';
import { AppPermissions } from '../../utils/permission'; 

const router = Router();

// Get all article
router.get('/', getArticlesController);

// Get article by id
router.get('/:id', getArticleByIdController);

// Create article
router.post('/', 
  authenticateToken, 
  validateRequest(createArticleSchema), 
  requirePermission([AppPermissions.ARTICLE_CREATE]), 
  createArticleController
);

// Edit article
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateArticleSchema), 
  requirePermission([AppPermissions.ARTICLE_EDIT]), 
  updateArticleController
);

// Delete article
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.ARTICLE_DELETE]), 
  deleteArticleController
);

export default router;