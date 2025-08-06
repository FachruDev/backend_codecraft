import prisma from '../../utils/prisma';
import { CreateServiceInput, UpdateServiceInput } from '../../schemas/service/service.schema';

/**
 * Mendapatkan daftar semua layanan.
 * Termasuk data relasi terkait seperti proses, sub-layanan, keunggulan, Q&A, dan metadata SEO.
 */
export const getServices = async () => {
  return await prisma.service.findMany({
    include: {
      processes: true,
      subServices: true,
      excellences: true,
      qa: true,
      seoMetadata: true,
    },
    orderBy: {
      createdAt: 'desc', 
    },
  });
};

/**
 * Mendapatkan layanan berdasarkan ID.
 * Termasuk data relasi terkait.
 * @param {number} id ID layanan.
 */
export const getServiceById = async (id: number) => {
  return await prisma.service.findUnique({
    where: { id },
    include: {
      processes: true,
      subServices: true,
      excellences: true,
      qa: true,
      seoMetadata: true,
    },
  });
};

/**
 * Membuat layanan baru.
 * @param {CreateServiceInput} data Data layanan baru.
 */
export const createService = async (data: CreateServiceInput) => {
  return await prisma.service.create({
    data: {
      menuName: data.menuName,
      title: data.title,
      slogan: data.slogan,
      subtitle: data.subtitle,
      content: data.content,
    },
  });
};

/**
 * Meng-update layanan.
 * @param {number} id ID layanan yang akan di-update.
 * @param {UpdateServiceInput} data Data layanan yang akan di-update.
 */
export const updateService = async (id: number, data: UpdateServiceInput) => {
  return await prisma.service.update({
    where: { id },
    data: {
      menuName: data.menuName,
      title: data.title,
      slogan: data.slogan,
      subtitle: data.subtitle,
      content: data.content,
    },
  });
};

/**
 * Menghapus layanan.
 * @param {number} id ID layanan yang akan dihapus.
 */
export const deleteService = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.serviceProcess.deleteMany({
      where: { serviceId: id },
    });

    await tx.subService.deleteMany({
      where: { serviceId: id },
    });

    await tx.serviceExcellence.deleteMany({
      where: { serviceId: id },
    });

    await tx.qA.deleteMany({
      where: { serviceId: id },
    });

    await tx.seoMetadata.deleteMany({
      where: { serviceId: id },
    });

    return await tx.service.delete({
      where: { id },
    });
  });
};
