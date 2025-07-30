import { z } from 'zod';

// Schema for create new AboutOur.
export const createAboutOurSchema = z.object({
  title: z.record(z.string(), z.string()),
  subtitle: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
});

// Schema for updating existing AboutOur.
export const updateAboutOurSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
});

export type CreateAboutOurInput = z.infer<typeof createAboutOurSchema>;
export type UpdateAboutOurInput = z.infer<typeof updateAboutOurSchema>;