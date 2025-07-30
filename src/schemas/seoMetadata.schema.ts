import { z } from 'zod';

// Redefine robots enum.
export enum Robots {
  INDEX_FOLLOW = 'INDEX_FOLLOW',
  NOINDEX_FOLLOW = 'NOINDEX_FOLLOW',
  INDEX_NOFOLLOW = 'INDEX_NOFOLLOW',
  NOINDEX_NOFOLLOW = 'NOINDEX_NOFOLLOW',
}

// Scheme new for create new SeoMetadata.
export const createSeoMetadataSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title wajib diisi'),
  metaDescription: z.string().min(1, 'Meta description wajib diisi'),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url('Format URL OG Image tidak valid').optional(),
  ogType: z.string().optional(),
  canonicalUrl: z.string().url('Format URL canonical tidak valid').optional(),
  robots: z.nativeEnum(Robots).optional(),

  // Foreign keys
  portfolioId: z.number().int().optional(),
  serviceId: z.number().int().optional(),
  articleId: z.number().int().optional(),
}).refine(data => {
  // Validation of only 1 FK is filled in.
  const fks = [data.portfolioId, data.serviceId, data.articleId].filter(id => id !== undefined);
  return fks.length === 1;
}, {
  message: 'Hanya satu dari portfolioId, serviceId, atau articleId yang harus disediakan.',
  path: ['portfolioId', 'serviceId', 'articleId'], // Show error path
});

// Scheme for updating existing SeoMetadata.
export const updateSeoMetadataSchema = z.object({
  metaTitle: z.string().min(1, 'Meta title wajib diisi').optional(),
  metaDescription: z.string().min(1, 'Meta description wajib diisi').optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url('Format URL OG Image tidak valid').optional(),
  ogType: z.string().optional(),
  canonicalUrl: z.string().url('Format URL canonical tidak valid').optional(),
  robots: z.nativeEnum(Robots).optional(),

  // Foreign keys
  portfolioId: z.number().int().optional(),
  serviceId: z.number().int().optional(),
  articleId: z.number().int().optional(),
}).refine(data => {
  // Validation of only 1 FK is filled in.
  const fks = [data.portfolioId, data.serviceId, data.articleId].filter(id => id !== undefined);
  return fks.length <= 1; // Can be 0 (no FK update) or 1 (one FK update)
}, {
  message: 'Hanya satu dari portfolioId, serviceId, atau articleId yang boleh disediakan saat update.',
  path: ['portfolioId', 'serviceId', 'articleId'],
});

export type CreateSeoMetadataInput = z.infer<typeof createSeoMetadataSchema>;
export type UpdateSeoMetadataInput = z.infer<typeof updateSeoMetadataSchema>;