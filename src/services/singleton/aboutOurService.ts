import { PrismaClient } from '@prisma/client';
import { UpdateAboutOurInput } from '../../schemas/singleton/aboutOur.schema';

const prisma = new PrismaClient();

/**
 * Mendapatkan satu-satunya record AboutOur.
 * Menggunakan findFirst() karena mengelola data sebagai singleton.
 */
export const getAboutOur = async () => {
  return await prisma.aboutOur.findFirst();
};

/**
 * Membuat atau meng-update record AboutOur.
 * Fungsi "upsert" yang memastikan hanya ada satu record.
 * @param data Data untuk membuat atau meng-update.
 */
export const upsertAboutOur = async (data: UpdateAboutOurInput) => {
  const existingAboutOur = await prisma.aboutOur.findFirst();

  if (existingAboutOur) {
    return await prisma.aboutOur.update({
      where: { id: existingAboutOur.id },
      data,
    });
  } else {
    return await prisma.aboutOur.create({
      data: {
        title: data.title || {},
        subtitle: data.subtitle || {},
        description: data.description || {},
      },
    });
  }
};
