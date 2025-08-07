import { UpdateContactInformationInput } from '../../schemas/singleton/contactInformation.schema';
import prisma from '../../utils/prisma';

/**
 * Mendapatkan satu-satunya record contact information.
 * Menggunakan findFirst() karena mengelola data sebagai singleton.
 */
export const getContactInformation = async () => {
  return await prisma.contactInformation.findFirst();
};

/**
 * Membuat atau meng-update record contact information.
 * Fungsi "upsert" yang memastikan hanya ada satu record.
 * @param data Data untuk membuat atau meng-update.
 */
export const upsertContactInformation = async (data: UpdateContactInformationInput) => {
  const existingInfo = await prisma.contactInformation.findFirst();

  if (existingInfo) {
    return await prisma.contactInformation.update({
      where: { id: existingInfo.id },
      data,
    });
  } else {
    if (!data.email || !data.phoneNumber || !data.ourOffice) {
      throw new Error("Initial data for ContactInformation must include email, phoneNumber, and ourOffice.");
    }
    return await prisma.contactInformation.create({
      data: {
        email: data.email,
        phoneNumber: data.phoneNumber,
        ourOffice: data.ourOffice,
      },
    });
  }
};
