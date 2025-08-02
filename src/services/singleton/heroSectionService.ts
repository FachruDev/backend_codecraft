import { PrismaClient } from '@prisma/client';
import { UpdateHeroSectionInput } from '../../schemas/singleton/heroSection.schema';

const prisma = new PrismaClient();

/**
* Mengambil HeroSection tunggal dari basis data.
* Menggunakan findFirst() karna singleton.
*/
export const getHeroSection = async () => {
  return await prisma.heroSection.findFirst();
};

/**
* Membuat atau memperbarui HeroSection.
* Fungsi "upsert" memastikan hanya ada satu data.
* @param {UpdateHeroSectionInput} data Data untuk membuat atau memperbarui HeroSection.
*/
export const upsertHeroSection = async (data: UpdateHeroSectionInput) => {
  const existingHeroSection = await prisma.heroSection.findFirst();

  if (existingHeroSection) {
    return await prisma.heroSection.update({
      where: { id: existingHeroSection.id },
      data,
    });
  } else {
    return await prisma.heroSection.create({
      data: {
        title: data.title || {},
      },
    });
  }
};
