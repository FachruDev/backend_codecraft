import { Router } from 'express';
import {
  getClientsController,
  getClientByIdController,
  createClientController,
  updateClientController,
  deleteClientController,
  createClientsBulkController,
  deleteClientsBulkController,
} from '../controller/clientController';

import {
  authenticateToken,
  validateRequest,
  requirePermission,
} from '../middleware/middleware';

import { createClientSchema, updateClientSchema } from '../schemas/client.schema';
import { AppPermissions } from '../utils/permission';

const router = Router();

// GET all clients
router.get('/', getClientsController);

// GET client by ID
router.get('/:id', getClientByIdController);

// POST single client
router.post(
  '/',
  authenticateToken,
  validateRequest(createClientSchema),
  requirePermission([AppPermissions.CLIENT_CREATE]),
  createClientController
);

// POST bulk clients
router.post(
  '/bulk',
  authenticateToken,
  requirePermission([AppPermissions.CLIENT_CREATE]),
  createClientsBulkController
);

// PUT update single client
router.put(
  '/:id',
  authenticateToken,
  validateRequest(updateClientSchema),
  requirePermission([AppPermissions.CLIENT_EDIT]),
  updateClientController
);

// DELETE single client
router.delete(
  '/:id',
  authenticateToken,
  requirePermission([AppPermissions.CLIENT_DELETE]),
  deleteClientController
);

// DELETE bulk clients
router.delete(
  '/bulk',
  authenticateToken,
  requirePermission([AppPermissions.CLIENT_DELETE]),
  deleteClientsBulkController
);

export default router;
