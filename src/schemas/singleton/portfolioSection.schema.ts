import { z } from 'zod';

// Schema for updating existing PortfolioSection
export const updatePortfolioSectionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
});

export type UpdatePortfolioSectionInput = z.infer<typeof updatePortfolioSectionSchema>;