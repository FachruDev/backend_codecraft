import { Request, Response } from 'express';
import { getServiceSection, upsertServiceSection } from '../../services/service/sectionService';
import { updateServiceSectionSchema } from '../../schemas/service/serviceSection.schema'; 
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan satu-satunya data ServiceSection.
 * @param {Request} req
 * @param {Response} res
 */
export const getServiceSectionData = async (req: Request, res: Response) => {
  try {
    const serviceSection = await getServiceSection();

    if (!serviceSection) {
      return res.status(404).json({ message: 'Service section data not found' });
    }

    res.status(200).json({ data: serviceSection });
  } catch (error) {
    console.error('Error fetching service section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data ServiceSection.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertServiceSectionData = async (req: Request, res: Response) => {
  try {
    const validatedData = updateServiceSectionSchema.parse(req.body);
    const updatedServiceSection = await upsertServiceSection(validatedData);

    res.status(200).json({ data: updatedServiceSection, message: 'Service section data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert service section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
