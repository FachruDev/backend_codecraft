import { Router } from 'express';
import { 
  getContactFormsController,
  getContactFormByIdController,
  createContactFormController,
  deleteContactFormController
} from '../controller/contactFormController'; 
import { authenticateToken, validateRequest, requirePermission } from '../middleware/middleware';
import { createContactFormSchema } from '../schemas/contactForm.schema'; 
import { AppPermissions } from '../utils/permission';

const router = Router();

// Create contact form
router.post('/', validateRequest(createContactFormSchema), createContactFormController);

// Get all contact form
router.get('/',
  authenticateToken,
  requirePermission([AppPermissions.CONTACT_FORM_VIEW]),
  getContactFormsController
);

// Get contact form by id
router.get('/:id',
  authenticateToken,
  requirePermission([AppPermissions.CONTACT_FORM_VIEW]),
  getContactFormByIdController
);

// Delete contact form by id
router.delete('/:id',
  authenticateToken,
  requirePermission([AppPermissions.CONTACT_FORM_DELETE]),
  deleteContactFormController
);

export default router;