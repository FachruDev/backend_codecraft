import { Request, Response } from 'express';
import { getAllPermissions } from '../services/permissionService';

/**
 * Controller untuk mendapatkan daftar semua permission dari database.
 * @param {Request} req
 * @param {Response} res
 */
export const getPermissionsController = async (req: Request, res: Response) => {
  try {
    const permissions = await getAllPermissions();

    res.status(200).json({ data: permissions });
  } catch (error) {
    console.error('Error fetching permissions from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
