import prisma from '../utils/prisma';
import { CreateSocialMediaInput, UpdateSocialMediaInput } from '../schemas/socialMedia.schema';

/**
 * Mendapatkan daftar semua media sosial.
 */
export const getSocialMedia = async () => {
  return await prisma.socialMedia.findMany({
    orderBy: {
      id: 'asc',
    },
  });
};

/**
 * Mendapatkan media sosial berdasarkan ID.
 * @param {number} id ID media sosial.
 */
export const getSocialMediaById = async (id: number) => {
  return await prisma.socialMedia.findUnique({
    where: { id },
  });
};

/**
 * Membuat media sosial baru.
 * @param {CreateSocialMediaInput} data Data media sosial baru.
 */
export const createSocialMedia = async (data: CreateSocialMediaInput) => {
  return await prisma.socialMedia.create({
    data,
  });
};

/**
 * Meng-update media sosial.
 * @param {number} id ID media sosial yang akan di-update.
 * @param {UpdateSocialMediaInput} data Data media sosial yang akan di-update.
 */
export const updateSocialMedia = async (id: number, data: UpdateSocialMediaInput) => {
  return await prisma.socialMedia.update({
    where: { id },
    data,
  });
};

/**
 * Menghapus media sosial.
 * @param {number} id ID media sosial yang akan dihapus.
 */
export const deleteSocialMedia = async (id: number) => {
  return await prisma.socialMedia.delete({
    where: { id },
  });
};
