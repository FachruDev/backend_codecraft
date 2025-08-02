import { z } from 'zod';

// Schema for updating existing contactSection.
export const updateContactSectionSchema = z.object({
  slogan: z.record(z.string(), z.string()).optional(),
});

export type UpdateContactSectionInput = z.infer<typeof updateContactSectionSchema>;