import { z } from 'zod';

// Scheme for create new category article.
export const createArticleCategorySchema = z.object({
  title: z.record(z.string(), z.string()),
});

// Scheme for updating existing category article.
export const updateArticleCategorySchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
});

export type CreateArticleCategoryInput = z.infer<typeof createArticleCategorySchema>;
export type UpdateArticleCategoryInput = z.infer<typeof updateArticleCategorySchema>;