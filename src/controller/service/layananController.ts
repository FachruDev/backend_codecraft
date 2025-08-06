import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createServiceSchema, updateServiceSchema } from '../../schemas/service/service.schema';
import * as serviceService from '../../services/service/layananService';

/**
 * Mendapatkan daftar semua layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const getServicesController = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getServices();
    res.status(200).json({ data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan layanan berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getServiceByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const service = await serviceService.getServiceById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat layanan baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createServiceController = async (req: Request, res: Response) => {
  try {
    const validatedData = createServiceSchema.parse(req.body);
    const newService = await serviceService.createService(validatedData);
    res.status(201).json({ data: newService, message: 'Service created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const updateServiceController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const validatedData = updateServiceSchema.parse(req.body);
    const updatedService = await serviceService.updateService(id, validatedData);

    res.status(200).json({ data: updatedService, message: 'Service updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteServiceController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    await serviceService.deleteService(id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
