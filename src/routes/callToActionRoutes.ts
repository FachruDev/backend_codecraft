import { Router } from 'express';
import { 
  getCallToActionsController, 
  getCallToActionByIdController, 
  createCallToActionController, 
  updateCallToActionController, 
  deleteCallToActionController 
} from '../controller/callToActionController'; 
import { authenticateToken, validateRequest, requirePermission } from '../middleware/middleware'; 
import { createCallToActionSchema, updateCallToActionSchema } from '../schemas/callToAction.schema'; 
import { AppPermissions } from '../utils/permission'; 

const router = Router();

// Get all call to action
router.get('/', getCallToActionsController);

// Get call to action by id
router.get('/:id', getCallToActionByIdController);

// Create call to action
router.post('/', 
  authenticateToken, 
  validateRequest(createCallToActionSchema), 
  requirePermission([AppPermissions.CALL_TO_ACTION_CREATE]), 
  createCallToActionController
);

// Create call to action
router.put('/:id', 
  authenticateToken, 
  validateRequest(updateCallToActionSchema), 
  requirePermission([AppPermissions.CALL_TO_ACTION_EDIT]), 
  updateCallToActionController
);

// Delete call to action
router.delete('/:id', 
  authenticateToken, 
  requirePermission([AppPermissions.CALL_TO_ACTION_DELETE]), 
  deleteCallToActionController
);

export default router;