import { PrismaClient } from '@prisma/client';
import { UpdateContactSectionInput } from '../../schemas/singleton/contactSection.schema';

const prisma = new PrismaClient();

/**
 * Mendapatkan satu-satunya record ContactSection.
 * Menggunakan findFirst() karena mengelola data sebagai singleton.
 */
export const getContactSection = async () => {
  return await prisma.contactSection.findFirst();
};

/**
 * Membuat atau meng-update record ContactSection.
 * Fungsi "upsert" yang memastikan hanya ada satu record.
 * @param {UpdateContactSectionInput} data Data untuk membuat atau meng-update.
 */
export const upsertContactSection = async (data: UpdateContactSectionInput) => {
  const existingSection = await prisma.contactSection.findFirst();

  if (existingSection) {
    return await prisma.contactSection.update({
      where: { id: existingSection.id },
      data,
    });
  } else {
    return await prisma.contactSection.create({
      data: {
        slogan: data.slogan || {},
      },
    });
  }
};
