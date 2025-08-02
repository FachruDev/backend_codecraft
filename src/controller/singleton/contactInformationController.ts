import { Request, Response } from 'express';
import { getContactInformation, upsertContactInformation } from '../../services/singleton/contactInformationService';
import { updateContactInformationSchema } from '../../schemas/singleton/contactInformation.schema';
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan satu-satunya data contact information.
 * @param {Request} req
 * @param {Response} res
 */
export const getContactInfo = async (req: Request, res: Response) => {
  try {
    const contactInfo = await getContactInformation();

    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.status(200).json({ data: contactInfo });
  } catch (error) {
    console.error('Error fetching contact information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data contact information.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertContactInfo = async (req: Request, res: Response) => {
  try {
    const validatedData = updateContactInformationSchema.parse(req.body);
    const updatedContactInfo = await upsertContactInformation(validatedData);

    res.status(200).json({ data: updatedContactInfo, message: 'Contact information updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert contact information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
