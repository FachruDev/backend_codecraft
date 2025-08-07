import prisma from '../../utils/prisma';
import { UpdateWhyWeInput } from '../../schemas/singleton/whyWe.schema';

/**
 * Mendapatkan satu-satunya record WhyWe.
 * Menggunakan findFirst() karena kita mengelola data sebagai singleton.
 */
export const getWhyWe = async () => {
  return await prisma.whyWe.findFirst();
};

/**
 * Membuat atau meng-update record WhyWe.
 * Ini adalah fungsi "upsert" yang memastikan hanya ada satu record.
 * @param {UpdateWhyWeInput} data Data untuk membuat atau meng-update.
 */
export const upsertWhyWe = async (data: UpdateWhyWeInput) => {
  const existingWhyWe = await prisma.whyWe.findFirst();

  if (existingWhyWe) {
    return await prisma.whyWe.update({
      where: { id: existingWhyWe.id },
      data,
    });
  } else {
    return await prisma.whyWe.create({
      data: {
        title: data.title || {},
        subtitle: data.subtitle || {},
        description: data.description || {},
        image: data.image || '',
      },
    });
  }
};
