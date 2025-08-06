import prisma from '../utils/prisma';
import { 
  CreateGroupInput, 
  UpdateGroupInput, 
  BulkAddUsersInput, 
  BulkRemoveUsersInput,
  BulkAddPermissionsInput,
  BulkRemovePermissionsInput 
} from '../schemas/group.schema';

/**
 * Mendapatkan daftar semua grup dengan user dan permission.
 */
export const getGroups = async () => {
  return prisma.group.findMany({
    include: {
      users: { select: { id: true, name: true, email: true } },
      permissions: { select: { id: true, name: true } },
    },
  });
};

/**
 * Mendapatkan grup berdasarkan ID.
 * @param {number} id ID grup.
 */
export const getGroupById = async (id: number) => {
  return prisma.group.findUnique({
    where: { id },
    include: {
      users: { select: { id: true, name: true, email: true } },
      permissions: { select: { id: true, name: true } },
    },
  });
};

/**
 * Membuat grup baru.
 * @param {CreateGroupInput} data Data grup baru.
 */
export const createGroup = async (data: CreateGroupInput) => {
  const { permissionIds, userIds, ...rest } = data;
  return prisma.group.create({
    data: {
      ...rest,
      permissions: permissionIds ? { connect: permissionIds.map(id => ({ id })) } : undefined,
      users: userIds ? { connect: userIds.map(id => ({ id })) } : undefined,
    },
  });
};

/**
 * Meng-update grup.
 * @param {number} id ID grup yang akan di-update.
 * @param {UpdateGroupInput} data Data grup yang akan di-update.
 */
export const updateGroup = async (id: number, data: UpdateGroupInput) => {
  const { permissionIds, userIds, ...rest } = data;
  const updateData: any = { ...rest };

  if (permissionIds !== undefined) {
    updateData.permissions = {
      set: permissionIds.map(permId => ({ id: permId })),
    };
  }

  if (userIds !== undefined) {
    updateData.users = {
      set: userIds.map(userId => ({ id: userId })),
    };
  }

  return prisma.group.update({
    where: { id },
    data: updateData,
  });
};

/**
 * Menghapus grup.
 * @param {number} id ID grup yang akan dihapus.
 */
export const deleteGroup = async (id: number) => {
  return prisma.group.delete({
    where: { id },
  });
};

/**
 * Menambahkan user ke grup.
 * @param {number} groupId ID grup.
 * @param {number} userId ID user.
 */
export const addUserToGroup = async (groupId: number, userId: number) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      users: {
        connect: { id: userId },
      },
    },
  });
};

/**
 * Menghapus user dari grup.
 * @param {number} groupId ID grup.
 * @param {number} userId ID user.
 */
export const removeUserFromGroup = async (groupId: number, userId: number) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      users: {
        disconnect: { id: userId },
      },
    },
  });
};

/**
 * Menambahkan banyak user ke grup sekaligus (bulk add).
 * @param {number} groupId ID grup.
 * @param {BulkAddUsersInput} data Data user yang akan ditambahkan.
 */
export const bulkAddUsersToGroup = async (groupId: number, data: BulkAddUsersInput) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      users: {
        connect: data.userIds.map(id => ({ id })),
      },
    },
    include: {
      users: { select: { id: true, name: true, email: true } },
    },
  });
};

/**
 * Menghapus banyak user dari grup sekaligus (bulk remove).
 * @param {number} groupId ID grup.
 * @param {BulkRemoveUsersInput} data Data user yang akan dihapus.
 */
export const bulkRemoveUsersFromGroup = async (groupId: number, data: BulkRemoveUsersInput) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      users: {
        disconnect: data.userIds.map(id => ({ id })),
      },
    },
    include: {
      users: { select: { id: true, name: true, email: true } },
    },
  });
};

/**
 * Menambahkan banyak permission ke grup sekaligus (bulk add).
 * @param {number} groupId ID grup.
 * @param {BulkAddPermissionsInput} data Data permission yang akan ditambahkan.
 */
export const bulkAddPermissionsToGroup = async (groupId: number, data: BulkAddPermissionsInput) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      permissions: {
        connect: data.permissionIds.map(id => ({ id })),
      },
    },
    include: {
      permissions: { select: { id: true, name: true } },
    },
  });
};

/**
 * Menghapus banyak permission dari grup sekaligus (bulk remove).
 * @param {number} groupId ID grup.
 * @param {BulkRemovePermissionsInput} data Data permission yang akan dihapus.
 */
export const bulkRemovePermissionsFromGroup = async (groupId: number, data: BulkRemovePermissionsInput) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      permissions: {
        disconnect: data.permissionIds.map(id => ({ id })),
      },
    },
    include: {
      permissions: { select: { id: true, name: true } },
    },
  });
};
