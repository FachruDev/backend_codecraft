import { Request, Response } from 'express';
import { getContactSection, upsertContactSection } from '../../services/singleton/contactSectionService';
import { updateContactSectionSchema } from '../../schemas/singleton/contactSection.schema';
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan satu-satunya data ContactSection.
 * @param {Request} req
 * @param {Response} res
 */
export const getContactSectionData = async (req: Request, res: Response) => {
  try {
    const contactSection = await getContactSection();

    if (!contactSection) {
      return res.status(404).json({ message: 'Contact section data not found' });
    }

    res.status(200).json({ data: contactSection });
  } catch (error) {
    console.error('Error fetching contact section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data ContactSection.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertContactSectionData = async (req: Request, res: Response) => {
  try {
    const validatedData = updateContactSectionSchema.parse(req.body);
    const updatedContactSection = await upsertContactSection(validatedData);

    res.status(200).json({ data: updatedContactSection, message: 'Contact section data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert contact section data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
