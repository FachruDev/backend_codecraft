import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createServiceProcessSchema, updateServiceProcessSchema } from '../../schemas/service/serviceProcess.schema';
import * as serviceProcessService from '../../services/service/processService';

/**
 * Mendapatkan daftar semua proses layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const getServiceProcessesController = async (req: Request, res: Response) => {
  try {
    const processes = await serviceProcessService.getServiceProcesses();
    res.status(200).json({ data: processes });
  } catch (error) {
    console.error('Error fetching service processes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan proses layanan berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getServiceProcessByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service process ID' });
    }

    const process = await serviceProcessService.getServiceProcessById(id);
    if (!process) {
      return res.status(404).json({ message: 'Service process not found' });
    }

    res.status(200).json({ data: process });
  } catch (error) {
    console.error('Error fetching service process:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat proses layanan baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createServiceProcessController = async (req: Request, res: Response) => {
  try {
    const validatedData = createServiceProcessSchema.parse(req.body);
    const newProcess = await serviceProcessService.createServiceProcess(validatedData);
    res.status(201).json({ data: newProcess, message: 'Service process created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating service process:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update proses layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const updateServiceProcessController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service process ID' });
    }

    const validatedData = updateServiceProcessSchema.parse(req.body);
    const updatedProcess = await serviceProcessService.updateServiceProcess(id, validatedData);

    res.status(200).json({ data: updatedProcess, message: 'Service process updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating service process:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus proses layanan.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteServiceProcessController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service process ID' });
    }

    await serviceProcessService.deleteServiceProcess(id);
    res.status(200).json({ message: 'Service process deleted successfully' });
  } catch (error) {
    console.error('Error deleting service process:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
