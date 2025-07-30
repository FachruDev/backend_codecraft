import { z } from 'zod';

// Scheme for create new contactForm.
export const createContactFormSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid').min(1, 'Email wajib diisi'),
  phoneNumber: z.string().min(1, 'Nomor telepon wajib diisi'),
  subject: z.string().min(1, 'Subjek wajib diisi'),
  message: z.string().min(1, 'Pesan wajib diisi'),
});

export type CreateContactFormInput = z.infer<typeof createContactFormSchema>;