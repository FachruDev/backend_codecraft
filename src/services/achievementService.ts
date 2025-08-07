import prisma from '../utils/prisma';
import { CreateAchievementInput, UpdateAchievementInput } from '../schemas/achievement.schema';

/**
 * Mendapatkan daftar semua achievement.
 */
export const getAchievements = async () => {
  return await prisma.achievement.findMany({
    orderBy: {
      id: 'asc', 
    },
  });
};

/**
 * Mendapatkan achievement berdasarkan ID.
 * @param {number} id ID achievement.
 */
export const getAchievementById = async (id: number) => {
  return await prisma.achievement.findUnique({
    where: { id },
  });
};

/**
 * Membuat achievement baru.
 * @param {CreateAchievementInput} data Data achievement baru.
 */
export const createAchievement = async (data: CreateAchievementInput) => {
  return await prisma.achievement.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
    },
  });
};

/**
 * Meng-update achievement.
 * @param {number} id ID achievement yang akan di-update.
 * @param {UpdateAchievementInput} data Data achievement yang akan di-update.
 */
export const updateAchievement = async (id: number, data: UpdateAchievementInput) => {
  return await prisma.achievement.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
    },
  });
};

/**
 * Menghapus achievement.
 * @param {number} id ID achievement yang akan dihapus.
 */
export const deleteAchievement = async (id: number) => {
  return await prisma.achievement.delete({
    where: { id },
  });
};
