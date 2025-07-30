import { z } from 'zod';

// Schema for creating new permission.
export const createPermissionSchema = z.object({
  name: z.string()
    .min(3, 'Nama izin minimal 3 karakter')
    .regex(/^[a-z_]+\.[a-z_]+$/, "Nama izin harus dalam format 'resource.action' (contoh: 'article.create' atau 'user_management.view')"),
});

// Schema for updating existing permission.
export const updatePermissionSchema = z.object({
  name: z.string()
    .min(3, 'Nama izin minimal 3 karakter')
    .regex(/^[a-z_]+\.[a-z_]+$/, "Nama izin harus dalam format 'resource.action' (contoh: 'article.create' atau 'user_management.view')")
    .optional(),
});

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;