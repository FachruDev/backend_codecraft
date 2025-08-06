import prisma from '../../utils/prisma';
import { UpdateServiceSectionInput } from '../../schemas/service/serviceSection.schema';

/**
 * Mendapatkan satu-satunya record ServiceSection.
 */
export const getServiceSection = async () => {
  return await prisma.serviceSection.findFirst();
};

/**
 * Membuat atau meng-update record ServiceSection.
 * @param {UpdateServiceSectionInput} data Data untuk membuat atau meng-update.
 */
export const upsertServiceSection = async (data: UpdateServiceSectionInput) => {
  const existingSection = await prisma.serviceSection.findFirst();

  if (existingSection) {
    return await prisma.serviceSection.update({
      where: { id: existingSection.id },
      data,
    });
  } else {
    return await prisma.serviceSection.create({
      data: {
        title: data.title || {},
        subtitle: data.subtitle || {},
        description: data.description || {},
      },
    });
  }
};
