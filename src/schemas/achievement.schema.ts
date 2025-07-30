import { z } from 'zod';

// Schema for creating new Achievement
export const createAchievementSchema = z.object({
  title: z.string().min(1, 'Judul achievement wajib diisi'),
  subtitle: z.record(z.string(), z.string()),
});

// Schema for updating existing Achievement
export const updateAchievementSchema = z.object({
  title: z.string().min(1, 'Judul achievement wajib diisi').optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
});

export type CreateAchievementInput = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementInput = z.infer<typeof updateAchievementSchema>;