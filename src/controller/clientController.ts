import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createClientSchema, updateClientSchema } from '../schemas/client.schema';
import * as clientService from '../services/clientService';

/**
 * Mendapatkan daftar semua klien.
 * @param {Request} req
 * @param {Response} res
 */
export const getClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json({ data: clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Mendapatkan klien berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    const client = await clientService.getClientById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ data: client });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat klien baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createClientController = async (req: Request, res: Response) => {
  try {
    const validatedData = createClientSchema.parse(req.body);
    const newClient = await clientService.createClient(validatedData);
    res.status(201).json({ data: newClient, message: 'Client created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Meng-update klien.
 * @param {Request} req
 * @param {Response} res
 */
export const updateClientController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    const validatedData = updateClientSchema.parse(req.body);
    const updatedClient = await clientService.updateClient(id, validatedData);

    res.status(200).json({ data: updatedClient, message: 'Client updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus klien.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    await clientService.deleteClient(id);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Membuat banyak klien sekaligus (bulk create).
 * @param {Request} req
 * @param {Response} res
 */
export const createClientsBulkController = async (req: Request, res: Response) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Request body harus berupa array' });
    }

    const validatedClients = req.body.map((client: any, index: number) => {
      try {
        return createClientSchema.parse(client);
      } catch (error) {
        if (error instanceof ZodError) {
          throw {
            index,
            issues: error.issues,
          };
        }
        throw error;
      }
    });

    const result = await clientService.createClientsBulk(validatedClients);
    res.status(201).json({ message: 'Clients created successfully', count: result.count });
  } catch (error: any) {
    if (Array.isArray(error)) {
      return res.status(400).json({ message: 'Validation failed on some items', errors: error });
    }
    if (error.index !== undefined) {
      return res.status(400).json({
        message: `Validation failed at index ${error.index}`,
        errors: error.issues,
      });
    }
    console.error('Error creating clients in bulk:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Menghapus banyak klien sekaligus berdasarkan array ID.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteClientsBulkController = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'number')) {
      return res.status(400).json({ message: 'Request body harus berisi array angka (id)' });
    }

    const result = await clientService.deleteClientsBulk(ids);
    res.status(200).json({ message: 'Clients deleted successfully', count: result.count });
  } catch (error) {
    console.error('Error deleting clients in bulk:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
