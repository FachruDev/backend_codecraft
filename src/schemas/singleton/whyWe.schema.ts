import { z } from 'zod';

// Schema for updating existing WhyWe.
export const updateWhyWeSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
  image: z.url('Format URL gambar tidak valid').min(1, 'URL gambar wajib diisi').optional(),
});

export type UpdateWhyWeInput = z.infer<typeof updateWhyWeSchema>;