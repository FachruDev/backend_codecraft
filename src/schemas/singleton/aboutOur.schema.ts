import { z } from 'zod';

// Schema for updating existing AboutOur.
export const updateAboutOurSchema = z.object({
  title: z.record(z.string(), z.string()).optional(),
  subtitle: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
});

export type UpdateAboutOurInput = z.infer<typeof updateAboutOurSchema>;