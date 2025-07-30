import { z } from 'zod';

// Schema for creating new user
export const createUserSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.email({ error: "Format email tidak valid" }),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  profile: z.string().optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  groupIds: z.array(z.number().int()).optional(),
});

// Schema for updating existing user.
export const updateUserSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').optional(),
  email: z.email({ error: "Format email tidak valid" }).optional(),
  profile: z.string().optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  password: z.string().min(8, 'Password minimal 8 karakter').optional(),
  groupIds: z.array(z.number().int()).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;