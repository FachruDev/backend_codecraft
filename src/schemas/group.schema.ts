import { z } from 'zod';

// Schema for creating new group.
export const createGroupSchema = z.object({
  name: z.string().min(2, 'Nama grup minimal 2 karakter'),
  permissionIds: z.array(z.number().int()).optional(),
  userIds: z.array(z.number().int()).optional(),
});

// Schema for updating existing group.
export const updateGroupSchema = z.object({
  name: z.string().min(2, 'Nama grup minimal 2 karakter').optional(),
  permissionIds: z.array(z.number().int()).optional(),
  userIds: z.array(z.number().int()).optional(),
});

// Schema for bulk add users to group
export const bulkAddUsersSchema = z.object({
  userIds: z.array(z.number().int()).min(1, 'Minimal 1 user ID harus disediakan'),
});

// Schema for bulk remove users from group
export const bulkRemoveUsersSchema = z.object({
  userIds: z.array(z.number().int()).min(1, 'Minimal 1 user ID harus disediakan'),
});

// Schema for bulk add permissions to group
export const bulkAddPermissionsSchema = z.object({
  permissionIds: z.array(z.number().int()).min(1, 'Minimal 1 permission ID harus disediakan'),
});

// Schema for bulk remove permissions from group
export const bulkRemovePermissionsSchema = z.object({
  permissionIds: z.array(z.number().int()).min(1, 'Minimal 1 permission ID harus disediakan'),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
export type BulkAddUsersInput = z.infer<typeof bulkAddUsersSchema>;
export type BulkRemoveUsersInput = z.infer<typeof bulkRemoveUsersSchema>;
export type BulkAddPermissionsInput = z.infer<typeof bulkAddPermissionsSchema>;
export type BulkRemovePermissionsInput = z.infer<typeof bulkRemovePermissionsSchema>;