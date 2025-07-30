import { z } from 'zod';

// Schema for creating new Client
export const createClientSchema = z.object({
  image: z.string().url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi'),
});

// Schema for updating existing Client
export const updateClientSchema = z.object({
  image: z.string().url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi').optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;