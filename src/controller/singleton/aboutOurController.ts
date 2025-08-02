import { Request, Response } from 'express';
import { getAboutOur, upsertAboutOur } from '../../services/singleton/aboutOurService';
import { updateAboutOurSchema } from '../../schemas/singleton/aboutOur.schema';
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan data AboutOur.
 * @param {Request} req
 * @param {Response} res
 */
export const getAboutUs = async (req: Request, res: Response) => {
  try {
    const aboutOur = await getAboutOur();

    if (!aboutOur) {
      return res.status(404).json({ message: 'About Our data not found' });
    }

    res.status(200).json({ data: aboutOur });
  } catch (error) {
    console.error('Error fetching About Our data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data AboutOur.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertAboutUs = async (req: Request, res: Response) => {
  try {
    const validatedData = updateAboutOurSchema.parse(req.body);
    const updatedAboutOur = await upsertAboutOur(validatedData);

    res.status(200).json({ data: updatedAboutOur, message: 'About Our data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert About Our data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
