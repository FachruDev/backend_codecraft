import { z } from 'zod';

// Schema for create new WhyWe.
export const createWhyWeSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  image: z.url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi'),
});

// Schema for updating existing WhyWe.
export const updateWhyWeSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
  image: z.url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi').optional(),
});

export type CreateWhyWeInput = z.infer<typeof createWhyWeSchema>;
export type UpdateWhyWeInput = z.infer<typeof updateWhyWeSchema>;