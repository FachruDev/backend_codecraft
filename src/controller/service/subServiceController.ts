import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createSubServiceSchema, updateSubServiceSchema } from '../../schemas/service/subService.schema';
import * as subServiceService from '../../services/service/subService';

/**
 * Mendapatkan daftar semua sub-layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const getSubServicesController = async (req: Request, res: Response) => {
  try {
    const subServices = await subServiceService.getSubServices();
    res.status(200).json({ data: subServices });
  } catch (error) {
    console.error('Error fetching sub-services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan sub-layanan berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getSubServiceByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid sub-service ID' });
    }

    const subService = await subServiceService.getSubServiceById(id);
    if (!subService) {
      return res.status(404).json({ message: 'Sub-service not found' });
    }

    res.status(200).json({ data: subService });
  } catch (error) {
    console.error('Error fetching sub-service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat sub-layanan baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createSubServiceController = async (req: Request, res: Response) => {
  try {
    const validatedData = createSubServiceSchema.parse(req.body);
    const newSubService = await subServiceService.createSubService(validatedData);
    res.status(201).json({ data: newSubService, message: 'Sub-service created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating sub-service:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update sub-layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const updateSubServiceController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid sub-service ID' });
    }

    const validatedData = updateSubServiceSchema.parse(req.body);
    const updatedSubService = await subServiceService.updateSubService(id, validatedData);

    res.status(200).json({ data: updatedSubService, message: 'Sub-service updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating sub-service:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus sub-layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteSubServiceController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid sub-service ID' });
    }

    await subServiceService.deleteSubService(id);
    res.status(200).json({ message: 'Sub-service deleted successfully' });
  } catch (error) {
    console.error('Error deleting sub-service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
