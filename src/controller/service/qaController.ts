import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createQASchema, updateQASchema } from '../../schemas/service/qa.schema';
import * as qaService from '../../services/service/qaService';

/**
 * Mendapatkan daftar semua Q&A.
 * @param {Request} req
 * @param {Response} res
 */
export const getQAsController = async (req: Request, res: Response) => {
  try {
    const qas = await qaService.getQAs();
    res.status(200).json({ data: qas });
  } catch (error) {
    console.error('Error fetching Q&As:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan Q&A berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getQAByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Q&A ID' });
    }

    const qa = await qaService.getQAById(id);
    if (!qa) {
      return res.status(404).json({ message: 'Q&A not found' });
    }

    res.status(200).json({ data: qa });
  } catch (error) {
    console.error('Error fetching Q&A:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat Q&A baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createQAController = async (req: Request, res: Response) => {
  try {
    const validatedData = createQASchema.parse(req.body);
    const newQA = await qaService.createQA(validatedData);
    res.status(201).json({ data: newQA, message: 'Q&A created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating Q&A:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update Q&A.
 * @param {Request} req
 * @param {Response} res
 */
export const updateQAController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Q&A ID' });
    }

    const validatedData = updateQASchema.parse(req.body);
    const updatedQA = await qaService.updateQA(id, validatedData);

    res.status(200).json({ data: updatedQA, message: 'Q&A updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating Q&A:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus Q&A.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteQAController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Q&A ID' });
    }

    await qaService.deleteQA(id);
    res.status(200).json({ message: 'Q&A deleted successfully' });
  } catch (error) {
    console.error('Error deleting Q&A:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
