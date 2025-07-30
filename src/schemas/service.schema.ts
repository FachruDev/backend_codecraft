import { z } from 'zod';

// Schema for creating new Service
export const createServiceSchema = z.object({
  menuName: z.record(z.string(), z.string()),
  title: z.record(z.string(), z.string()),
  slogan: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  content: z.record(z.string(), z.string()),
});

// Schema for updating existing Service
export const updateServiceSchema = z.object({
  menuName: z.record(z.string(), z.string()).optional(),
  title: z.record(z.string(), z.string()).optional(),
  slogan: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  content: z.record(z.string(), z.string()).optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;