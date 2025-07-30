import { z } from 'zod';

// Schema for create new CallToAction.
export const createCallToActionSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
});

// Schema for updating existing CallToAction.
export const updateCallToActionSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
});

export type CreateCallToActionInput = z.infer<typeof createCallToActionSchema>;
export type UpdateCallToActionInput = z.infer<typeof updateCallToActionSchema>;