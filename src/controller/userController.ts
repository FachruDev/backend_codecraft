import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';

/**
 * Mendapatkan daftar semua user.
 */
export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan user berdasarkan ID.
 */
export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID user tidak valid' });
    }

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat user baru.
 */
export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData: CreateUserInput = req.body;
    const newUser = await userService.createUser(validatedData);
    res.status(201).json({ success: true, data: newUser, message: 'User berhasil di buat' });
  } catch (error) {
    next(error);
  }
};

/**
 * Meng-update user (admin update).
 */
export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID user tidak valid' });
    }

    const validatedData: UpdateUserInput = req.body;
    const updatedUser = await userService.updateUser(id, validatedData);

    res.status(200).json({ success: true, data: updatedUser, message: 'Update user berhasil' });
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus user (admin delete).
 */
export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID user tidak valid' });
    }

    await userService.deleteUser(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Controller untuk User Mengelola Diri Sendiri
export const updateSelfController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User tidak terautentikasi' });
    }

    const validatedData: UpdateUserInput = req.body;
    const updatedUser = await userService.updateUser(userId, validatedData);

    res.status(200).json({ success: true, message: 'Profil berhasil diperbarui', data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteSelfController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User tidak terautentikasi' });
    }

    await userService.deleteUser(userId);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
