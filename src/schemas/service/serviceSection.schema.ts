import { z } from 'zod';

// Schema for creating new ServiceSection
export const createServiceSectionSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
});

// Schema for updating existing ServiceSection
export const updateServiceSectionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
});

export type CreateServiceSectionInput = z.infer<typeof createServiceSectionSchema>;
export type UpdateServiceSectionInput = z.infer<typeof updateServiceSectionSchema>;