import { Request, Response } from 'express';
import { getWhyWe, upsertWhyWe } from '../../services/singleton/whyWeService';
import { updateWhyWeSchema } from '../../schemas/singleton/whyWe.schema';
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan satu-satunya data WhyWe.
 * @param {Request} req
 * @param {Response} res
 */
export const getWhyWeData = async (req: Request, res: Response) => {
  try {
    const whyWe = await getWhyWe();

    if (!whyWe) {
      return res.status(404).json({ message: 'Why We data not found' });
    }

    res.status(200).json({ data: whyWe });
  } catch (error) {
    console.error('Error fetching Why We data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data WhyWe.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertWhyWeData = async (req: Request, res: Response) => {
  try {
    const validatedData = updateWhyWeSchema.parse(req.body);
    const updatedWhyWe = await upsertWhyWe(validatedData);

    res.status(200).json({ data: updatedWhyWe, message: 'Why We data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert Why We data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
