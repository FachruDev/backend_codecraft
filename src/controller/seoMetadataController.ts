import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createSeoMetadataSchema, updateSeoMetadataSchema } from '../schemas/seoMetadata.schema';
import * as seoMetadataService from '../services/seoMetadataService';

/**
 * Mendapatkan daftar semua metadata SEO.
 * @param {Request} req
 * @param {Response} res
 */
export const getSeoMetadataController = async (req: Request, res: Response) => {
  try {
    const metadata = await seoMetadataService.getSeoMetadata();
    res.status(200).json({ data: metadata });
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan metadata SEO berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getSeoMetadataByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid SEO metadata ID' });
    }

    const metadata = await seoMetadataService.getSeoMetadataById(id);
    if (!metadata) {
      return res.status(404).json({ message: 'SEO metadata not found' });
    }

    res.status(200).json({ data: metadata });
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat metadata SEO baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createSeoMetadataController = async (req: Request, res: Response) => {
  try {
    const validatedData = createSeoMetadataSchema.parse(req.body);
    const newMetadata = await seoMetadataService.createSeoMetadata(validatedData);
    res.status(201).json({ data: newMetadata, message: 'SEO metadata created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating SEO metadata:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update metadata SEO.
 * @param {Request} req
 * @param {Response} res
 */
export const updateSeoMetadataController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid SEO metadata ID' });
    }

    const validatedData = updateSeoMetadataSchema.parse(req.body);
    const updatedMetadata = await seoMetadataService.updateSeoMetadata(id, validatedData);

    res.status(200).json({ data: updatedMetadata, message: 'SEO metadata updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating SEO metadata:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus metadata SEO.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteSeoMetadataController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid SEO metadata ID' });
    }

    await seoMetadataService.deleteSeoMetadata(id);
    res.status(200).json({ message: 'SEO metadata deleted successfully' });
  } catch (error) {
    console.error('Error deleting SEO metadata:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
