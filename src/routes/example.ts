import { Router } from 'express';
import { 
  authenticateToken, 
  requireRole, 
  requirePermission 
} from '../middleware/middleware';

const router = Router();

// Example route that requires authentication
router.get('/protected', 
  authenticateToken,
  (req, res) => {
    res.json({
      success: true,
      message: 'Ini adalah protected route',
      user: req.user
    });
  }
);

// Example route that requires specific role
router.get('/admin-only', 
  authenticateToken,
  requireRole(['admin', 'super_admin']),
  (req, res) => {
    res.json({
      success: true,
      message: 'Ini adalah admin only route',
      user: req.user
    });
  }
);

// Example route that requires specific permission
router.post('/create-article', 
  authenticateToken,
  requirePermission(['article.create']),
  (req, res) => {
    res.json({
      success: true,
      message: 'Artikel berhasil dibuat',
      user: req.user
    });
  }
);

// Example route that requires multiple permissions
router.delete('/delete-article/:id', 
  authenticateToken,
  requirePermission(['article.delete', 'article.manage']),
  (req, res) => {
    res.json({
      success: true,
      message: 'Artikel berhasil dihapus',
      articleId: req.params.id,
      user: req.user
    });
  }
);

// Example route with role and permission combination
router.put('/update-user/:id', 
  authenticateToken,
  requireRole(['admin']),
  requirePermission(['user.update']),
  (req, res) => {
    res.json({
      success: true,
      message: 'User berhasil diupdate',
      userId: req.params.id,
      user: req.user
    });
  }
);

export default router; 