import { z } from 'zod';

// Redefine Prisma's ArticleStatus enum
export enum ArticleStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

// Scheme for create new article.
export const createArticleSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  coverImage: z.string().url('Format URL gambar cover tidak valid').min(1, 'Gambar cover wajib diisi'),
  content: z.record(z.string(), z.string()),
  rate: z.number().int().min(0).max(5).default(0).optional(),
  status: z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT), 
  dateUpload: z.string().datetime().optional(), 
  authorId: z.number().int(),
  categoryId: z.number().int(),
});

// Scheme for updating existing article.
export const updateArticleSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  coverImage: z.string().url('Format URL gambar cover tidak valid').min(1, 'Gambar cover wajib diisi').optional(),
  content: z.record(z.string(), z.string()).optional(),
  rate: z.number().int().min(0).max(5).optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
  dateUpload: z.string().datetime().optional(),
  authorId: z.number().int().optional(),
  categoryId: z.number().int().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;