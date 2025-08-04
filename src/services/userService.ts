import prisma from '../utils/prisma';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '15', 10); 

/**
 * Mendapatkan daftar semua user dengan data terbatas 
 */
export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      profile: true,
      role: true,
      createdAt: true,
    },
  });
};

/**
 * Mendapatkan user berdasarkan ID.
 * Menggunakan select untuk keamanan (tidak mengembalikan password).
 * @param {number} id ID user.
 */
export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      profile: true,
      bio: true,
      role: true,
      createdAt: true,
      groups: {
        select: {
          id: true,
          name: true,
        },
      },
      articles: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

/**
 * Membuat user baru.
 * @param {CreateUserInput} data Data user baru.
 */
export const createUser = async (data: CreateUserInput) => {
  const { password, groupIds, ...rest } = data;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const createData: Prisma.UserCreateInput = {
    ...rest,
    password: hashedPassword,
    groups: groupIds ? { connect: groupIds.map(id => ({ id })) } : undefined,
  };

  return prisma.user.create({
    data: createData,
  });
};

/**
 * Meng-update user.
 * @param {number} id ID user yang akan di-update.
 * @param {UpdateUserInput} data Data user yang akan di-update.
 */
export const updateUser = async (id: number, data: UpdateUserInput) => {
  const { password, groupIds, ...rest } = data;
  const updateData: Prisma.UserUpdateInput = { ...rest };

  if (password) {
    updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  if (groupIds) {
    updateData.groups = {
      set: groupIds.map(groupId => ({ id: groupId })),
    };
  } else if (groupIds === null) {
      updateData.groups = { set: [] };
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
  });
};

/**
 * Menghapus user.
 * @param {number} id ID user yang akan dihapus.
 */
export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};
