import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createArticleCategorySchema, updateArticleCategorySchema } from '../../schemas/article/articleCategory.schema';
import * as articleCategoryService from '../../services/article/articleCategoryService';

/**
 * Mendapatkan daftar semua kategori artikel.
 * @param {Request} req
 * @param {Response} res
 */
export const getArticleCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await articleCategoryService.getArticleCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    console.error('Error fetching article categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan kategori artikel berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getArticleCategoryByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid article category ID' });
    }

    const category = await articleCategoryService.getArticleCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Article category not found' });
    }

    res.status(200).json({ data: category });
  } catch (error) {
    console.error('Error fetching article category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat kategori artikel baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createArticleCategoryController = async (req: Request, res: Response) => {
  try {
    const validatedData = createArticleCategorySchema.parse(req.body);
    const newCategory = await articleCategoryService.createArticleCategory(validatedData);
    res.status(201).json({ data: newCategory, message: 'Article category created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating article category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update kategori artikel.
 * @param {Request} req
 * @param {Response} res
 */
export const updateArticleCategoryController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid article category ID' });
    }

    const validatedData = updateArticleCategorySchema.parse(req.body);
    const updatedCategory = await articleCategoryService.updateArticleCategory(id, validatedData);

    res.status(200).json({ data: updatedCategory, message: 'Article category updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating article category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus kategori artikel.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteArticleCategoryController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid article category ID' });
    }

    await articleCategoryService.deleteArticleCategory(id);
    res.status(200).json({ message: 'Article category deleted successfully' });
  } catch (error) {
    console.error('Error deleting article category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
