import { z } from 'zod';

// Schema for create new socialMedia.
export const createSocialMediaSchema = z.object({
  name: z.string().min(1, 'Nama media sosial wajib diisi'),
  icon: z.url('Format URL icon tidak valid').min(1, 'URL icon wajib diisi'),
  link: z.url('Format URL link tidak valid').min(1, 'URL link wajib diisi'),
});

// Schema for updating existing socialMedia.
export const updateSocialMediaSchema = z.object({
  name: z.string().min(1, 'Nama media sosial wajib diisi').optional(),
  icon: z.url('Format URL icon tidak valid').min(1, 'URL icon wajib diisi').optional(),
  link: z.url('Format URL link tidak valid').min(1, 'URL link wajib diisi').optional(),
});

export type CreateSocialMediaInput = z.infer<typeof createSocialMediaSchema>;
export type UpdateSocialMediaInput = z.infer<typeof updateSocialMediaSchema>;