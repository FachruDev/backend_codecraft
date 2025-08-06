import { z } from 'zod';

// Schema for updating existing ServiceSection
export const updateServiceSectionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
});

export type UpdateServiceSectionInput = z.infer<typeof updateServiceSectionSchema>;