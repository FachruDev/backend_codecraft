import prisma from '../utils/prisma';
import { CreatePortfolioInput, UpdatePortfolioInput } from '../schemas/portfolio.schema';

/**
 * Mendapatkan daftar semua portofolio.
 */
export const getPortfolios = async () => {
  return await prisma.portfolio.findMany({
    include: {
      seoMetadata: true, 
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

/**
 * Mendapatkan portofolio berdasarkan ID.
 * @param {number} id ID portofolio.
 */
export const getPortfolioById = async (id: number) => {
  return await prisma.portfolio.findUnique({
    where: { id },
    include: {
      seoMetadata: true,
    },
  });
};

/**
 * Membuat portofolio baru.
 * @param {CreatePortfolioInput} data Data portofolio baru.
 */
export const createPortfolio = async (data: CreatePortfolioInput) => {
  return await prisma.portfolio.create({
    data: {
      title: data.title,
      slogan: data.slogan,
      subtitle: data.subtitle,
      media: data.media,
      content: data.content,
    },
  });
};

/**
 * Meng-update portofolio.
 * @param {number} id ID portofolio yang akan di-update.
 * @param {UpdatePortfolioInput} data Data portofolio yang akan di-update.
 */
export const updatePortfolio = async (id: number, data: UpdatePortfolioInput) => {
  return await prisma.portfolio.update({
    where: { id },
    data,
  });
};

/**
 * Menghapus portofolio.
 * Jika portofolio dihapus, SeoMetadata terkait juga akan ikut terhapus.
 * @param {number} id ID portofolio yang akan dihapus.
 */
export const deletePortfolio = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.seoMetadata.deleteMany({
      where: { portfolioId: id }, 
    });

    return await tx.portfolio.delete({
      where: { id },
    });
  });
};
