import { Router } from 'express';
import {
  getGroupsController,
  getGroupByIdController,
  createGroupController,
  updateGroupController,
  deleteGroupController,
  addUserToGroupController,
  removeUserFromGroupController,
  bulkAddUsersToGroupController,
  bulkRemoveUsersFromGroupController,
  bulkAddPermissionsToGroupController,
  bulkRemovePermissionsFromGroupController
} from '../controller/groupController';
import {
  authenticateToken,
  validateRequest,
  requirePermission
} from '../middleware/middleware';
import {
  createGroupSchema,
  updateGroupSchema,
  bulkAddUsersSchema,
  bulkRemoveUsersSchema,
  bulkAddPermissionsSchema,
  bulkRemovePermissionsSchema
} from '../schemas/group.schema';
import { AppPermissions } from '../utils/permission';

const router = Router();

// Get all groups
router.get(
  '/',
  authenticateToken,
  requirePermission([AppPermissions.GROUP_VIEW]),
  getGroupsController
);

// Get group by ID
router.get(
  '/:id',
  authenticateToken,
  requirePermission([AppPermissions.GROUP_VIEW]),
  getGroupByIdController
);

// Create new group
router.post(
  '/',
  authenticateToken,
  validateRequest(createGroupSchema),
  requirePermission([AppPermissions.GROUP_CREATE]),
  createGroupController
);

// Update group
router.put(
  '/:id',
  authenticateToken,
  validateRequest(updateGroupSchema),
  requirePermission([AppPermissions.GROUP_EDIT]),
  updateGroupController
);

// Delete group
router.delete(
  '/:id',
  authenticateToken,
  requirePermission([AppPermissions.GROUP_DELETE]),
  deleteGroupController
);

// Add single user to group
router.post(
  '/:id/users',
  authenticateToken,
  requirePermission([AppPermissions.GROUP_EDIT]),
  addUserToGroupController
);

// Remove single user from group
router.delete(
  '/:id/users',
  authenticateToken,
  requirePermission([AppPermissions.GROUP_EDIT]),
  removeUserFromGroupController
);

// Bulk add users to group
router.post(
  '/:id/users/bulk',
  authenticateToken,
  validateRequest(bulkAddUsersSchema),
  requirePermission([AppPermissions.GROUP_EDIT]),
  bulkAddUsersToGroupController
);

// Bulk remove users from group
router.delete(
  '/:id/users/bulk',
  authenticateToken,
  validateRequest(bulkRemoveUsersSchema),
  requirePermission([AppPermissions.GROUP_EDIT]),
  bulkRemoveUsersFromGroupController
);

// Bulk add permissions to group
router.post(
  '/:id/permissions/bulk',
  authenticateToken,
  validateRequest(bulkAddPermissionsSchema),
  requirePermission([AppPermissions.GROUP_EDIT]),
  bulkAddPermissionsToGroupController
);

// Bulk remove permissions from group
router.delete(
  '/:id/permissions/bulk',
  authenticateToken,
  validateRequest(bulkRemovePermissionsSchema),
  requirePermission([AppPermissions.GROUP_EDIT]),
  bulkRemovePermissionsFromGroupController
);

export default router;