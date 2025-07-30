import { z } from 'zod';

// Schema for creating new Portfolio
export const createPortfolioSchema = z.object({
  title: z.record(z.string(), z.string()),
  slogan: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  media: z.url('Format URL media tidak valid').min(1, 'URL media wajib diisi'),
  content: z.record(z.string(), z.string()),
});

// Schema for updating existing Portfolio
export const updatePortfolioSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  slogan: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  media: z.url('Format URL media tidak valid').min(1, 'URL media wajib diisi').optional(),
  content: z.record(z.string(), z.string()).optional(),
});

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;