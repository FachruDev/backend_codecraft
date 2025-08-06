import prisma from '../../utils/prisma';
import { CreateServiceProcessInput, UpdateServiceProcessInput } from '../../schemas/service/serviceProcess.schema';

/**
 * Mendapatkan daftar semua proses layanan.
 */
export const getServiceProcesses = async () => {
  return await prisma.serviceProcess.findMany({
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
 * Mendapatkan proses layanan berdasarkan ID.
 * @param {number} id ID proses layanan.
 */
export const getServiceProcessById = async (id: number) => {
  return await prisma.serviceProcess.findUnique({
    where: { id },
    include: {
      service: {
        select: { id: true, menuName: true, title: true },
      },
    },
  });
};

/**
 * Membuat proses layanan baru.
 * @param {CreateServiceProcessInput} data Data proses layanan baru.
 */
export const createServiceProcess = async (data: CreateServiceProcessInput) => {
  const { serviceId, ...rest } = data;
  const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!serviceExists) {
    throw new Error(`Service with ID ${serviceId} not found.`);
  }

  return await prisma.serviceProcess.create({
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
 * Meng-update proses layanan.
 * @param {number} id ID proses layanan yang akan di-update.
 * @param {UpdateServiceProcessInput} data Data proses layanan yang akan di-update.
 */
export const updateServiceProcess = async (id: number, data: UpdateServiceProcessInput) => {
  const { serviceId, ...rest } = data;
  const updateData: any = { ...rest };

  if (serviceId !== undefined) {
    const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!serviceExists) {
      throw new Error(`Service with ID ${serviceId} not found.`);
    }
    updateData.service = { connect: { id: serviceId } };
  }

  return await prisma.serviceProcess.update({
    where: { id },
    data: updateData,
    include: {
      service: { select: { id: true, menuName: true } },
    },
  });
};

/**
 * Menghapus proses layanan.
 * @param {number} id ID proses layanan yang akan dihapus.
 */
export const deleteServiceProcess = async (id: number) => {
  return await prisma.serviceProcess.delete({
    where: { id },
  });
};
