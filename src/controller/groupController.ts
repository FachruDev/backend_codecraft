import { Request, Response, NextFunction } from 'express';
import * as groupService from '../services/groupService';
import { 
  createGroupSchema, 
  updateGroupSchema, 
  bulkAddUsersSchema, 
  bulkRemoveUsersSchema,
  bulkAddPermissionsSchema,
  bulkRemovePermissionsSchema 
} from '../schemas/group.schema';

/**
 * Mendapatkan daftar semua grup.
 */
export const getGroupsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups = await groupService.getGroups();
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan grup berdasarkan ID.
 */
export const getGroupByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    const group = await groupService.getGroupById(id);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Grup tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: group });
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat grup baru.
 */
export const createGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createGroupSchema.parse(req.body);
    const newGroup = await groupService.createGroup(validatedData);
    res.status(201).json({ success: true, message: 'Grup berhasil dibuat', data: newGroup });
  } catch (error) {
    next(error);
  }
};

/**
 * Meng-update grup.
 */
export const updateGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    const validatedData = updateGroupSchema.parse(req.body);
    const updatedGroup = await groupService.updateGroup(id, validatedData);
    res.status(200).json({ success: true, message: 'Grup berhasil diperbarui', data: updatedGroup });
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus grup.
 */
export const deleteGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    await groupService.deleteGroup(id);
    res.status(200).json({ success: true, message: 'Grup berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

/**
 * Menambahkan user ke grup.
 */
export const addUserToGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id);
    const { userId } = req.body;
    if (isNaN(groupId) || isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'ID grup atau user tidak valid' });
    }
    await groupService.addUserToGroup(groupId, userId);
    res.status(200).json({ success: true, message: 'User berhasil ditambahkan ke grup' });
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus user dari grup.
 */
export const removeUserFromGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id);
    const { userId } = req.body;
    if (isNaN(groupId) || isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'ID grup atau user tidak valid' });
    }
    await groupService.removeUserFromGroup(groupId, userId);
    res.status(200).json({ success: true, message: 'User berhasil dihapus dari grup' });
  } catch (error) {
    next(error);
  }
};

/**
 * Menambahkan banyak user ke grup sekaligus (bulk add).
 */
export const bulkAddUsersToGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id);
    if (isNaN(groupId)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    const validatedData = bulkAddUsersSchema.parse(req.body);
    const updatedGroup = await groupService.bulkAddUsersToGroup(groupId, validatedData);
    res.status(200).json({ 
      success: true, 
      message: 'Users berhasil ditambahkan ke grup', 
      data: updatedGroup 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus banyak user dari grup sekaligus (bulk remove).
 */
export const bulkRemoveUsersFromGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id);
    if (isNaN(groupId)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    const validatedData = bulkRemoveUsersSchema.parse(req.body);
    const updatedGroup = await groupService.bulkRemoveUsersFromGroup(groupId, validatedData);
    res.status(200).json({ 
      success: true, 
      message: 'Users berhasil dihapus dari grup', 
      data: updatedGroup 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menambahkan banyak permission ke grup sekaligus (bulk add).
 */
export const bulkAddPermissionsToGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id);
    if (isNaN(groupId)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    const validatedData = bulkAddPermissionsSchema.parse(req.body);
    const updatedGroup = await groupService.bulkAddPermissionsToGroup(groupId, validatedData);
    res.status(200).json({ 
      success: true, 
      message: 'Permissions berhasil ditambahkan ke grup', 
      data: updatedGroup 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus banyak permission dari grup sekaligus (bulk remove).
 */
export const bulkRemovePermissionsFromGroupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id);
    if (isNaN(groupId)) {
      return res.status(400).json({ success: false, message: 'ID grup tidak valid' });
    }
    const validatedData = bulkRemovePermissionsSchema.parse(req.body);
    const updatedGroup = await groupService.bulkRemovePermissionsFromGroup(groupId, validatedData);
    res.status(200).json({ 
      success: true, 
      message: 'Permissions berhasil dihapus dari grup', 
      data: updatedGroup 
    });
  } catch (error) {
    next(error);
  }
};
