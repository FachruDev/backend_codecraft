import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createCallToActionSchema, updateCallToActionSchema } from '../schemas/callToAction.schema';
import * as ctaService from '../services/callToActionService';

/**
 * Controller untuk mendapatkan daftar semua CallToAction.
 * @param {Request} req
 * @param {Response} res
 */
export const getCallToActionsController = async (req: Request, res: Response) => {
  try {
    const ctas = await ctaService.getCallToActions();
    res.status(200).json({ data: ctas });
  } catch (error) {
    console.error('Error fetching Call To Actions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk mendapatkan CallToAction berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getCallToActionByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Call To Action ID' });
    }

    const cta = await ctaService.getCallToActionById(id);
    if (!cta) {
      return res.status(404).json({ message: 'Call To Action not found' });
    }

    res.status(200).json({ data: cta });
  } catch (error) {
    console.error('Error fetching Call To Action:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat CallToAction baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createCallToActionController = async (req: Request, res: Response) => {
  try {
    const validatedData = createCallToActionSchema.parse(req.body);
    const newCta = await ctaService.createCallToAction(validatedData);
    res.status(201).json({ data: newCta, message: 'Call To Action created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating Call To Action:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk meng-update CallToAction.
 * @param {Request} req
 * @param {Response} res
 */
export const updateCallToActionController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Call To Action ID' });
    }

    const validatedData = updateCallToActionSchema.parse(req.body);
    const updatedCta = await ctaService.updateCallToAction(id, validatedData);

    res.status(200).json({ data: updatedCta, message: 'Call To Action updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating Call To Action:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk menghapus CallToAction.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteCallToActionController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Call To Action ID' });
    }

    await ctaService.deleteCallToAction(id);
    res.status(200).json({ message: 'Call To Action deleted successfully' });
  } catch (error) {
    console.error('Error deleting Call To Action:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
