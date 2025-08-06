import { CreateServiceExcellenceInput, UpdateServiceExcellenceInput } from '../../schemas/service/serviceExcellence.schema';
import prisma from '../../utils/prisma';

/**
 * Mendapatkan daftar semua keunggulan layanan.
 * Termasuk data layanan terkait.
 */
export const getServiceExcellences = async () => {
  return await prisma.serviceExcellence.findMany({
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
 * Mendapatkan keunggulan layanan berdasarkan ID.
 * @param {number} id ID keunggulan layanan.
 */
export const getServiceExcellenceById = async (id: number) => {
  return await prisma.serviceExcellence.findUnique({
    where: { id },
    include: {
      service: {
        select: { id: true, menuName: true, title: true },
      },
    },
  });
};

/**
 * Membuat keunggulan layanan baru.
 * @param {CreateServiceExcellenceInput} data Data keunggulan layanan baru.
 */
export const createServiceExcellence = async (data: CreateServiceExcellenceInput) => {
  const { serviceId, ...rest } = data;
  const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!serviceExists) {
    throw new Error(`Service with ID ${serviceId} not found.`);
  }

  return await prisma.serviceExcellence.create({
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
 * Meng-update keunggulan layanan.
 * @param {number} id ID keunggulan layanan yang akan di-update.
 * @param {UpdateServiceExcellenceInput} data Data keunggulan layanan yang akan di-update.
 */
export const updateServiceExcellence = async (id: number, data: UpdateServiceExcellenceInput) => {
  const { serviceId, ...rest } = data;
  const updateData: any = { ...rest };

  if (serviceId !== undefined) {
    const serviceExists = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!serviceExists) {
      throw new Error(`Service with ID ${serviceId} not found.`);
    }
    updateData.service = { connect: { id: serviceId } };
  }

  return await prisma.serviceExcellence.update({
    where: { id },
    data: updateData,
    include: {
      service: { select: { id: true, menuName: true } },
    },
  });
};

/**
 * Menghapus keunggulan layanan.
 * @param {number} id ID keunggulan layanan yang akan dihapus.
 */
export const deleteServiceExcellence = async (id: number) => {
  return await prisma.serviceExcellence.delete({
    where: { id },
  });
};
