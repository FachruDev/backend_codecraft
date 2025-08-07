import { Router } from 'express';
import {
  getPortfoliosController,
  getPortfolioByIdController,
  createPortfolioController,
  updatePortfolioController,
  deletePortfolioController,
} from '../controller/portfolioController'; 
import { authenticateToken, validateRequest, requirePermission } from '../middleware/middleware'; 
import { createPortfolioSchema, updatePortfolioSchema } from '../schemas/portfolio.schema'; 
import { AppPermissions } from '../utils/permission'; 

const router = Router();

// Get all portfolio
router.get('/', getPortfoliosController);

// Get portfolio by id
router.get('/:id', getPortfolioByIdController);

// Create portfolio
router.post(
  '/',
  authenticateToken,
  validateRequest(createPortfolioSchema),
  requirePermission([AppPermissions.PORTFOLIO_CREATE]),
  createPortfolioController
);

// Update portfolio
router.put(
  '/:id',
  authenticateToken,
  validateRequest(updatePortfolioSchema),
  requirePermission([AppPermissions.PORTFOLIO_EDIT]),
  updatePortfolioController
);

// Delete portfolio
router.delete(
  '/:id',
  authenticateToken,
  requirePermission([AppPermissions.PORTFOLIO_DELETE]),
  deletePortfolioController
);

export default router;