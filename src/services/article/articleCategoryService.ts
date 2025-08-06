import { CreateArticleCategoryInput, UpdateArticleCategoryInput } from '../../schemas/article/articleCategory.schema';
import prisma from '../../utils/prisma';

/**
 * Mendapatkan daftar semua kategori artikel.
 */
export const getArticleCategories = async () => {
  return await prisma.articleCategory.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  });
};

/**
 * Mendapatkan kategori artikel berdasarkan ID.
 * @param {number} id ID kategori artikel.
 */
export const getArticleCategoryById = async (id: number) => {
  return await prisma.articleCategory.findUnique({
    where: { id },
  });
};

/**
 * Membuat kategori artikel baru.
 * @param {CreateArticleCategoryInput} data Data kategori artikel baru.
 */
export const createArticleCategory = async (data: CreateArticleCategoryInput) => {
  return await prisma.articleCategory.create({
    data: {
      title: data.title,
      slug: data.slug, 
    },
  });
};

/**
 * Meng-update kategori artikel.
 * @param {number} id ID kategori artikel yang akan di-update.
 * @param {UpdateArticleCategoryInput} data Data kategori artikel yang akan di-update.
 */
export const updateArticleCategory = async (id: number, data: UpdateArticleCategoryInput) => {
  return await prisma.articleCategory.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug, // Perbarui slug
    },
  });
};

/**
 * Menghapus kategori artikel.
 * Jika kategori dihapus, semua artikel yang terkait dengan kategori tersebut juga akan ikut terhapus.
 * @param {number} id ID kategori artikel yang akan dihapus.
 */
export const deleteArticleCategory = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.article.deleteMany({
      where: { categoryId: id },
    });

    return await tx.articleCategory.delete({
      where: { id },
    });
  });
};
