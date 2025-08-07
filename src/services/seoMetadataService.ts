import prisma from '../utils/prisma';
import { CreateSeoMetadataInput, UpdateSeoMetadataInput } from '../schemas/seoMetadata.schema';

/**
 * Mendapatkan daftar semua metadata SEO.
 */
export const getSeoMetadata = async () => {
  return await prisma.seoMetadata.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

/**
 * Mendapatkan metadata SEO berdasarkan ID.
 * @param {number} id ID metadata SEO.
 */
export const getSeoMetadataById = async (id: number) => {
  return await prisma.seoMetadata.findUnique({
    where: { id },
  });
};

/**
 * Membuat metadata SEO baru.
 * @param {CreateSeoMetadataInput} data Data metadata SEO baru.
 */
export const createSeoMetadata = async (data: CreateSeoMetadataInput) => {
  return await prisma.seoMetadata.create({
    data,
  });
};

/**
 * Meng-update metadata SEO.
 * @param {number} id ID metadata SEO yang akan di-update.
 * @param {UpdateSeoMetadataInput} data Data metadata SEO yang akan di-update.
 */
export const updateSeoMetadata = async (id: number, data: UpdateSeoMetadataInput) => {
  return await prisma.seoMetadata.update({
    where: { id },
    data,
  });
};

/**
 * Menghapus metadata SEO.
 * @param {number} id ID metadata SEO yang akan dihapus.
 */
export const deleteSeoMetadata = async (id: number) => {
  return await prisma.seoMetadata.delete({
    where: { id },
  });
};
