import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createArticleSchema, updateArticleSchema } from '../../schemas/article/article.schema';
import * as articleService from '../../services/article/articleService';

/**
 * Mendapatkan daftar semua artikel.
 * @param {Request} req
 * @param {Response} res
 */
export const getArticlesController = async (req: Request, res: Response) => {
  try {
    const articles = await articleService.getArticles();
    res.status(200).json({ data: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan artikel berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getArticleByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid article ID' });
    }

    const article = await articleService.getArticleById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ data: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat artikel baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createArticleController = async (req: Request, res: Response) => {
  try {
    const validatedData = createArticleSchema.parse(req.body);
    const newArticle = await articleService.createArticle(validatedData);
    res.status(201).json({ data: newArticle, message: 'Article created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating article:', error);
    // Tangani error spesifik dari service (misal: author/category tidak ditemukan)
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update artikel.
 * @param {Request} req
 * @param {Response} res
 */
export const updateArticleController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid article ID' });
    }

    const validatedData = updateArticleSchema.parse(req.body);
    const updatedArticle = await articleService.updateArticle(id, validatedData);

    res.status(200).json({ data: updatedArticle, message: 'Article updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating article:', error);
    // Tangani error spesifik dari service (misal: author/category tidak ditemukan)
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus artikel.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteArticleController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid article ID' });
    }

    await articleService.deleteArticle(id);
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
