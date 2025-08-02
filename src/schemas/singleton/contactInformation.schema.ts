import { z } from 'zod';

// Schema for updating existing contactInformation.
export const updateContactInformationSchema = z.object({
  email: z.email('Format email tidak valid').min(1, 'Email wajib diisi').optional(),
  phoneNumber: z.string().min(1, 'Nomor handphone wajib diisi').optional(),
  ourOffice: z.string().min(1, 'Alamat kantor wajib diisi').optional(),
});

export type UpdateContactInformationInput = z.infer<typeof updateContactInformationSchema>;