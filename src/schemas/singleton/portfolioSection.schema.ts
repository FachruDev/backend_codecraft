import { z } from 'zod';

// Schema for creating new PortfolioSection
export const createPortfolioSectionSchema = z.object({
  title: z.record(z.string(), z.string()),
});

// Schema for updating existing PortfolioSection
export const updatePortfolioSectionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
});

export type CreatePortfolioSectionInput = z.infer<typeof createPortfolioSectionSchema>;
export type UpdatePortfolioSectionInput = z.infer<typeof updatePortfolioSectionSchema>;