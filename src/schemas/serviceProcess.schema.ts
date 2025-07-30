import { z } from 'zod';

// Schema for creating new ServiceProcess
export const createServiceProcessSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  serviceId: z.number().int(),
});

// Schema for updating existing ServiceProcess
export const updateServiceProcessSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  serviceId: z.number().int().optional(),
});

export type CreateServiceProcessInput = z.infer<typeof createServiceProcessSchema>;
export type UpdateServiceProcessInput = z.infer<typeof updateServiceProcessSchema>;