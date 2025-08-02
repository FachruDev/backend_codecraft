import { z } from 'zod';

// Scheme for uppdating existing webSetting.
export const updateWebSettingSchema = z.object({
  title: z.string().min(1, 'Judul website wajib diisi').optional(),
  logo: z.url('Format URL logo tidak valid').min(1, 'URL logo wajib diisi').optional(),
  favicon: z.url('Format URL favicon tidak valid').min(1, 'URL favicon wajib diisi').optional(),
});

export type UpdateWebSettingInput = z.infer<typeof updateWebSettingSchema>;