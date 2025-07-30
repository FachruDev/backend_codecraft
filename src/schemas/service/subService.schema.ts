import { z } from 'zod';

// Schema for creating new SubService
export const createSubServiceSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  serviceId: z.number().int(),
});

// Schema for updating existing SubService
export const updateSubServiceSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  serviceId: z.number().int().optional(),
});

export type CreateSubServiceInput = z.infer<typeof createSubServiceSchema>;
export type UpdateSubServiceInput = z.infer<typeof updateSubServiceSchema>;