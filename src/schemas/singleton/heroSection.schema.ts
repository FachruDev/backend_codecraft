import { z } from 'zod';

// Schema for updating existing HeroSection
export const updateHeroSectionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
});

export type UpdateHeroSectionInput = z.infer<typeof updateHeroSectionSchema>;
