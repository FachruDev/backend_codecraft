import { z } from 'zod';

// Scheme for create new Q&A (Ask and question).
export const createQASchema = z.object({
  question: z.record(z.string(), z.string()),
  answer: z.record(z.string(), z.string()),
  serviceId: z.number().int(),
});

// Schema for updating existing Q&A.
export const updateQASchema = z.object({
  question: z.record(z.string(), z.string()).optional(),
  answer: z.record(z.string(), z.string()).optional(),
  serviceId: z.number().int().optional(),
});

export type CreateQAInput = z.infer<typeof createQASchema>;
export type UpdateQAInput = z.infer<typeof updateQASchema>;