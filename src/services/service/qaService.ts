import { PrismaClient } from '@prisma/client';
import { CreateQAInput, UpdateQAInput } from '../../schemas/service/qa.schema';

const prisma = new PrismaClient();

/**
 * Mendapatkan daftar semua Q&A.
 */
export const getQAs = async () => {
  return await prisma.qA.findMany({
    include: {
      service: {
        select: { id: true, menuName: true, title: true }, 
      },
    },
    orderBy: {
      id: 'asc', 
    },
  });
};

/**
 * Mendapatkan Q&A berdasarkan ID.
 * @param {number} id ID Q&A.
 */
export const getQAById = async (id: number) => {
  return await prisma.qA.findUnique({
    where: { id },
    include: {
      service: {
        select: { id: true, menuName: true, title: true },
      },
    },
  });
};

/**
 * Membuat Q&A baru.
 * @param {CreateQAInput} data Data Q&A baru.
 */
export const createQA = async (data: CreateQAInput) => {
  const { serviceId, ...rest } = data;

  return await prisma.qA.create({
    data: {
      ...rest,
      service: {
        connect: { id: serviceId },
      },
    },
    include: {
      service: { select: { id: true, menuName: true } },
    },
  });
};

/**
 * Meng-update Q&A.
 * @param {number} id ID Q&A yang akan di-update.
 * @param {UpdateQAInput} data Data Q&A yang akan di-update.
 */
export const updateQA = async (id: number, data: UpdateQAInput) => {
  const { serviceId, ...rest } = data;
  const updateData: any = { ...rest };

  if (serviceId !== undefined) { 
    updateData.service = {
      connect: { id: serviceId },
    };
  }

  return await prisma.qA.update({
    where: { id },
    data: updateData,
    include: {
      service: { select: { id: true, menuName: true } },
    },
  });
};

/**
 * Menghapus Q&A.
 * @param {number} id ID Q&A yang akan dihapus.
 */
export const deleteQA = async (id: number) => {
  return await prisma.qA.delete({
    where: { id },
  });
};
