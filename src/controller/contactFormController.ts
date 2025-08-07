import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createContactFormSchema } from '../schemas/contactForm.schema';
import * as contactFormService from '../services/contactFormService';

/**
 * Mendapatkan daftar semua formulir kontak.
 * @param {Request} req
 * @param {Response} res
 */
export const getContactFormsController = async (req: Request, res: Response) => {
  try {
    const forms = await contactFormService.getContactForms();
    res.status(200).json({ data: forms });
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan formulir kontak berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getContactFormByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid contact form ID' });
    }

    const form = await contactFormService.getContactFormById(id);
    if (!form) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    res.status(200).json({ data: form });
  } catch (error) {
    console.error('Error fetching contact form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat formulir kontak baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createContactFormController = async (req: Request, res: Response) => {
  try {
    const validatedData = createContactFormSchema.parse(req.body);
    const newForm = await contactFormService.createContactForm(validatedData);
    res.status(201).json({ data: newForm, message: 'Contact form submitted successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating contact form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus formulir kontak.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteContactFormController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid contact form ID' });
    }

    await contactFormService.deleteContactForm(id);
    res.status(200).json({ message: 'Contact form deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
