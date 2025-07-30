import { z } from 'zod';

// Schema for creating new HeroSection
export const createHeroSectionSchema = z.object({
  title: z.record(z.string(), z.string()),
});

// Schema for updating existing HeroSection
export const updateHeroSectionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
});

export type CreateHeroSectionInput = z.infer<typeof createHeroSectionSchema>;
export type UpdateHeroSectionInput = z.infer<typeof updateHeroSectionSchema>;
