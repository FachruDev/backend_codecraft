import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createServiceExcellenceSchema, updateServiceExcellenceSchema } from '../../schemas/service/serviceExcellence.schema';
import * as serviceExcellenceService from '../../services/service/excellenceService';

/**
 * Mendapatkan daftar semua keunggulan layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const getServiceExcellencesController = async (req: Request, res: Response) => {
  try {
    const excellences = await serviceExcellenceService.getServiceExcellences();
    res.status(200).json({ data: excellences });
  } catch (error) {
    console.error('Error fetching service excellences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan keunggulan layanan berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getServiceExcellenceByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service excellence ID' });
    }

    const excellence = await serviceExcellenceService.getServiceExcellenceById(id);
    if (!excellence) {
      return res.status(404).json({ message: 'Service excellence not found' });
    }

    res.status(200).json({ data: excellence });
  } catch (error) {
    console.error('Error fetching service excellence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat keunggulan layanan baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createServiceExcellenceController = async (req: Request, res: Response) => {
  try {
    const validatedData = createServiceExcellenceSchema.parse(req.body);
    const newExcellence = await serviceExcellenceService.createServiceExcellence(validatedData);
    res.status(201).json({ data: newExcellence, message: 'Service excellence created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating service excellence:', error);
    // Tangani error spesifik dari service (misal: serviceId tidak ditemukan)
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update keunggulan layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const updateServiceExcellenceController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service excellence ID' });
    }

    const validatedData = updateServiceExcellenceSchema.parse(req.body);
    const updatedExcellence = await serviceExcellenceService.updateServiceExcellence(id, validatedData);

    res.status(200).json({ data: updatedExcellence, message: 'Service excellence updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating service excellence:', error);
    // Tangani error spesifik dari service (misal: serviceId tidak ditemukan)
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus keunggulan layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteServiceExcellenceController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service excellence ID' });
    }

    await serviceExcellenceService.deleteServiceExcellence(id);
    res.status(200).json({ message: 'Service excellence deleted successfully' });
  } catch (error) {
    console.error('Error deleting service excellence:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
