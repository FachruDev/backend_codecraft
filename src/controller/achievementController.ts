import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createAchievementSchema, updateAchievementSchema } from '../schemas/achievement.schema';
import * as achievementService from '../services/achievementService';

/**
 * Mendapatkan daftar semua achievement.
 * @param {Request} req
 * @param {Response} res
 */
export const getAchievementsController = async (req: Request, res: Response) => {
  try {
    const achievements = await achievementService.getAchievements();
    res.status(200).json({ data: achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan achievement berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getAchievementByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid achievement ID' });
    }

    const achievement = await achievementService.getAchievementById(id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.status(200).json({ data: achievement });
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat achievement baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createAchievementController = async (req: Request, res: Response) => {
  try {
    const validatedData = createAchievementSchema.parse(req.body);
    const newAchievement = await achievementService.createAchievement(validatedData);
    res.status(201).json({ data: newAchievement, message: 'Achievement created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating achievement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update achievement.
 * @param {Request} req
 * @param {Response} res
 */
export const updateAchievementController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid achievement ID' });
    }

    const validatedData = updateAchievementSchema.parse(req.body);
    const updatedAchievement = await achievementService.updateAchievement(id, validatedData);

    res.status(200).json({ data: updatedAchievement, message: 'Achievement updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating achievement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus achievement.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteAchievementController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid achievement ID' });
    }

    await achievementService.deleteAchievement(id);
    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
