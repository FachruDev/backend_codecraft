import { Request, Response } from 'express';
import { getHeroSection, upsertHeroSection } from '../../services/singleton/heroSectionService';
import { updateHeroSectionSchema } from '../../schemas/singleton/heroSection.schema';
import { ZodError } from 'zod';

/**
* Controller untuk mengambil data HeroSection tunggal.
* @param {Request} req
* @param {Response} res
*/
export const getHeroSectionData = async (req: Request, res: Response) => {
  try {
    const heroSection = await getHeroSection();

    if (!heroSection) {
      return res.status(404).json({ message: 'Hero Section data not found' });
    }

    res.status(200).json({ data: heroSection });
  } catch (error) {
    console.error('Error fetching Hero Section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau memperbarui data HeroSection.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertHeroSectionData = async (req: Request, res: Response) => {
  try {
    const validatedData = updateHeroSectionSchema.parse(req.body);
    const updatedHeroSection = await upsertHeroSection(validatedData);

    res.status(200).json({ data: updatedHeroSection, message: 'Hero Section data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert Hero Section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
