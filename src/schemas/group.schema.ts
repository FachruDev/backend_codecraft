import { z } from 'zod';

// Schema for creating new group.
export const createGroupSchema = z.object({
  name: z.string().min(2, 'Nama grup minimal 2 karakter'),
  permissionIds: z.array(z.number().int()).optional(),
});

// Schema for updating existing group.
export const updateGroupSchema = z.object({
  name: z.string().min(2, 'Nama grup minimal 2 karakter').optional(),
  permissionIds: z.array(z.number().int()).optional(),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;