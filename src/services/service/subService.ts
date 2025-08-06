import prisma from '../../utils/prisma';
import { CreateSubServiceInput, UpdateSubServiceInput } from '../../schemas/service/subService.schema';

/**
 * Mendapatkan daftar semua sub-layanan.
 */
export const getSubServices = async () => {
  return await prisma.subService.findMany({
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
 * Mendapatkan sub-layanan berdasarkan ID.
 * @param {number} id ID sub-layanan.
 */
export const getSubServiceById = async (id: number) => {
  return await prisma.subService.findUnique({
    where: { id },
    include: {
      service: {
        select: { id: true, menuName: true, title: true },
      },
    },
  });
};

/**
 * Membuat sub-layanan baru.
 * @param {CreateSubServiceInput} data Data sub-layanan baru.
 */
export const createSubService = async (data: CreateSubServiceInput) => {
  const { serviceId, ...rest } = data;
  const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!serviceExists) {
    throw new Error(`Service with ID ${serviceId} not found.`);
  }

  return await prisma.subService.create({
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
 * Meng-update sub-layanan.
 * @param {number} id ID sub-layanan yang akan di-update.
 * @param {UpdateSubServiceInput} data Data sub-layanan yang akan di-update.
 */
export const updateSubService = async (id: number, data: UpdateSubServiceInput) => {
  const { serviceId, ...rest } = data;
  const updateData: any = { ...rest };

  if (serviceId !== undefined) {
    const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!serviceExists) {
      throw new Error(`Service with ID ${serviceId} not found.`);
    }
    updateData.service = { connect: { id: serviceId } };
  }

  return await prisma.subService.update({
    where: { id },
    data: updateData,
    include: {
      service: { select: { id: true, menuName: true } },
    },
  });
};

/**
 * Menghapus sub-layanan.
 * @param {number} id ID sub-layanan yang akan dihapus.
 */
export const deleteSubService = async (id: number) => {
  return await prisma.subService.delete({
    where: { id },
  });
};
