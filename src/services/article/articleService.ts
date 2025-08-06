import prisma from '../../utils/prisma';
import { CreateArticleInput, UpdateArticleInput, ArticleStatus } from '../../schemas/article/article.schema';

/**
 * Mendapatkan daftar semua artikel.
 * Termasuk data author dan kategori terkait.
 */
export const getArticles = async () => {
  return await prisma.article.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      seoMetadata: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

/**
 * Mendapatkan artikel berdasarkan ID.
 * Termasuk data author dan kategori terkait.
 * @param {number} id ID artikel.
 */
export const getArticleById = async (id: number) => {
  return await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      seoMetadata: true,
    },
  });
};

/**
 * Membuat artikel baru.
 * Memastikan authorId dan categoryId valid.
 * @param {CreateArticleInput} data Data artikel baru.
 */
export const createArticle = async (data: CreateArticleInput) => {
  const { authorId, categoryId, ...rest } = data;
  const authorExists = await prisma.user.findUnique({ where: { id: authorId } });
  
  if (!authorExists) {
    throw new Error(`Author with ID ${authorId} not found.`);
  }

  const categoryExists = await prisma.articleCategory.findUnique({ where: { id: categoryId } });
  if (!categoryExists) {
    throw new Error(`Article Category with ID ${categoryId} not found.`);
  }

  return await prisma.article.create({
    data: {
      ...rest,
      author: {
        connect: { id: authorId },
      },
      category: {
        connect: { id: categoryId },
      },
      status: data.status || ArticleStatus.DRAFT,
      rate: data.rate ?? 0,
    },
    include: {
      author: true,
      category: true,
    },
  });
};

/**
 * Meng-update artikel.
 * @param {number} id ID artikel yang akan di-update.
 * @param {UpdateArticleInput} data Data artikel yang akan di-update.
 */
export const updateArticle = async (id: number, data: UpdateArticleInput) => {
  const { authorId, categoryId, ...rest } = data;
  const updateData: any = { ...rest };

  if (authorId !== undefined) {
    const authorExists = await prisma.user.findUnique({ where: { id: authorId } });
    if (!authorExists) {
      throw new Error(`Author with ID ${authorId} not found.`);
    }
    updateData.author = { connect: { id: authorId } };
  }

  if (categoryId !== undefined) {
    const categoryExists = await prisma.articleCategory.findUnique({ where: { id: categoryId } });
    if (!categoryExists) {
      throw new Error(`Article Category with ID ${categoryId} not found.`);
    }
    updateData.category = { connect: { id: categoryId } };
  }

  return await prisma.article.update({
    where: { id },
    data: updateData,
    include: {
      author: true,
      category: true,
    },
  });
};

/**
 * Menghapus artikel.
 * Jika artikel dihapus, SeoMetadata terkait juga akan ikut terhapus.
 * @param {number} id ID artikel yang akan dihapus.
 */
export const deleteArticle = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.seoMetadata.deleteMany({
      where: { articleId: id },
    });

    return await tx.article.delete({
      where: { id },
    });
  });
};
