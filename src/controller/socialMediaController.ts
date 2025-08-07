import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createSocialMediaSchema, updateSocialMediaSchema } from '../schemas/socialMedia.schema';
import * as socialMediaService from '../services/socialMediaService';

/**
 * Mendapatkan daftar semua media sosial.
 * @param {Request} req
 * @param {Response} res
 */
export const getSocialMediaController = async (req: Request, res: Response) => {
  try {
    const socialMedia = await socialMediaService.getSocialMedia();
    res.status(200).json({ data: socialMedia });
  } catch (error) {
    console.error('Error fetching social media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan media sosial berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getSocialMediaByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid social media ID' });
    }

    const socialMedia = await socialMediaService.getSocialMediaById(id);
    if (!socialMedia) {
      return res.status(404).json({ message: 'Social media not found' });
    }

    res.status(200).json({ data: socialMedia });
  } catch (error) {
    console.error('Error fetching social media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat media sosial baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createSocialMediaController = async (req: Request, res: Response) => {
  try {
    const validatedData = createSocialMediaSchema.parse(req.body);
    const newSocialMedia = await socialMediaService.createSocialMedia(validatedData);
    res.status(201).json({ data: newSocialMedia, message: 'Social media created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating social media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update media sosial.
 * @param {Request} req
 * @param {Response} res
 */
export const updateSocialMediaController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid social media ID' });
    }

    const validatedData = updateSocialMediaSchema.parse(req.body);
    const updatedSocialMedia = await socialMediaService.updateSocialMedia(id, validatedData);

    res.status(200).json({ data: updatedSocialMedia, message: 'Social media updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating social media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus media sosial.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteSocialMediaController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid social media ID' });
    }

    await socialMediaService.deleteSocialMedia(id);
    res.status(200).json({ message: 'Social media deleted successfully' });
  } catch (error) {
    console.error('Error deleting social media:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
