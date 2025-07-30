import { z } from 'zod';

// Schema for create new contactSection.
export const createContactSectionSchema = z.object({
  slogan: z.record(z.string(), z.string()),
});

// Schema for updating existing contactSection.
export const updateContactSectionSchema = z.object({
  slogan: z.record(z.string(), z.string()).optional(),
});

export type CreateContactSectionInput = z.infer<typeof createContactSectionSchema>;
export type UpdateContactSectionInput = z.infer<typeof updateContactSectionSchema>;