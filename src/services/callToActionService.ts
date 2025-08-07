import prisma from '../utils/prisma';
import { CreateCallToActionInput, UpdateCallToActionInput } from '../schemas/callToAction.schema';

/**
 * Mendapatkan daftar semua CallToAction.
 */
export const getCallToActions = async () => {
  return await prisma.callToAction.findMany({
    orderBy: {
      id: 'asc',
    },
  });
};

/**
 * Mendapatkan CallToAction berdasarkan ID.
 * @param {number} id ID CallToAction.
 */
export const getCallToActionById = async (id: number) => {
  return await prisma.callToAction.findUnique({
    where: { id },
  });
};

/**
 * Membuat CallToAction baru.
 * @param {CreateCallToActionInput} data Data CallToAction baru.
 */
export const createCallToAction = async (data: CreateCallToActionInput) => {
  return await prisma.callToAction.create({
    data,
  });
};

/**
 * Meng-update CallToAction yang sudah ada.
 * @param {number} id ID CallToAction yang akan di-update.
 * @param {UpdateCallToActionInput} data Data CallToAction yang akan di-update.
 */
export const updateCallToAction = async (id: number, data: UpdateCallToActionInput) => {
  return await prisma.callToAction.update({
    where: { id },
    data,
  });
};

/**
 * Menghapus CallToAction.
 * @param {number} id ID CallToAction yang akan dihapus.
 */
export const deleteCallToAction = async (id: number) => {
  return await prisma.callToAction.delete({
    where: { id },
  });
};
