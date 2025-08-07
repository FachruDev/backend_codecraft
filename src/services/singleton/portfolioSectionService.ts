import prisma from '../../utils/prisma';
import { UpdatePortfolioSectionInput } from '../../schemas/singleton/portfolioSection.schema';

/**
 * Mendapatkan satu-satunya record PortfolioSection.
 * Menggunakan findFirst() karena mengelola data sebagai singleton.
 */
export const getPortfolioSection = async () => {
  return await prisma.portfolioSection.findFirst();
};

/**
 * Membuat atau meng-update record PortfolioSection.
 * Fungsi "upsert" yang memastikan hanya ada satu record.
 * @param {UpdatePortfolioSectionInput} data Data untuk membuat atau meng-update.
 */
export const upsertPortfolioSection = async (data: UpdatePortfolioSectionInput) => {
  const existingSection = await prisma.portfolioSection.findFirst();

  if (existingSection) {
    return await prisma.portfolioSection.update({
      where: { id: existingSection.id },
      data,
    });
  } else {
    return await prisma.portfolioSection.create({
      data: {
        title: data.title || {},
      },
    });
  }
};
