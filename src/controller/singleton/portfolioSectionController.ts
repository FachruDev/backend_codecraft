import { Request, Response } from 'express';
import { getPortfolioSection, upsertPortfolioSection } from '../../services/singleton/portfolioSectionService';
import { updatePortfolioSectionSchema } from '../../schemas/singleton/portfolioSection.schema';
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan satu-satunya data PortfolioSection.
 * @param {Request} req
 * @param {Response} res
 */
export const getPortfolioSectionData = async (req: Request, res: Response) => {
  try {
    const portfolioSection = await getPortfolioSection();

    if (!portfolioSection) {
      return res.status(404).json({ message: 'Portfolio section data not found' });
    }

    res.status(200).json({ data: portfolioSection });
  } catch (error) {
    console.error('Error fetching portfolio section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data PortfolioSection.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertPortfolioSectionData = async (req: Request, res: Response) => {
  try {
    const validatedData = updatePortfolioSectionSchema.parse(req.body);
    const updatedPortfolioSection = await upsertPortfolioSection(validatedData);

    res.status(200).json({ data: updatedPortfolioSection, message: 'Portfolio section data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert portfolio section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
