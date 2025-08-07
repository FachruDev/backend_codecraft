import prisma from '../utils/prisma';
import { CreateClientInput, UpdateClientInput } from '../schemas/client.schema';

/**
 * Mendapatkan daftar semua klien.
 */
export const getClients = async () => {
  return await prisma.client.findMany({
    orderBy: {
      id: 'asc', 
    },
  });
};

/**
 * Mendapatkan klien berdasarkan ID.
 * @param {number} id ID klien.
 */
export const getClientById = async (id: number) => {
  return await prisma.client.findUnique({
    where: { id },
  });
};

/**
 * Membuat klien baru.
 * @param {CreateClientInput} data Data klien baru.
 * @returns {Promise<Client>} Objek klien yang baru dibuat.
 */
export const createClient = async (data: CreateClientInput) => {
  return await prisma.client.create({
    data,
  });
};

/**
 * Meng-update klien.
 * @param {number} id ID klien yang akan di-update.
 * @param {UpdateClientInput} data Data klien yang akan di-update.
 */
export const updateClient = async (id: number, data: UpdateClientInput) => {
  return await prisma.client.update({
    where: { id },
    data,
  });
};

/**
 * Menghapus klien.
 * @param {number} id ID klien yang akan dihapus.
 */
export const deleteClient = async (id: number) => {
  return await prisma.client.delete({
    where: { id },
  });
};

/**
 * Membuat banyak klien sekaligus (bulk insert).
 * @param {CreateClientInput[]} clients Array data klien baru.
 */
export const createClientsBulk = async (clients: CreateClientInput[]) => {
  return await prisma.client.createMany({
    data: clients,
    skipDuplicates: true, // opsional
  });
};

/**
 * Menghapus banyak klien sekaligus berdasarkan array ID.
 * @param {number[]} ids Array ID klien yang ingin dihapus.
 */
export const deleteClientsBulk = async (ids: number[]) => {
  return await prisma.client.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};
