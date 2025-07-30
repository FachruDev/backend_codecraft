import { z } from 'zod';

// Scheme for create new ServiceExcellence.
export const createServiceExcellenceSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  image: z.string().url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi'),
  serviceId: z.number().int(),
});

// Schema for updating existing ServiceExcellence.
export const updateServiceExcellenceSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  image: z.string().url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi').optional(),
  serviceId: z.number().int().optional(),
});

export type CreateServiceExcellenceInput = z.infer<typeof createServiceExcellenceSchema>;
export type UpdateServiceExcellenceInput = z.infer<typeof updateServiceExcellenceSchema>;