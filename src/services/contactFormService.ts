import prisma from '../utils/prisma';
import { CreateContactFormInput } from '../schemas/contactForm.schema';

/**
 * Mendapatkan daftar semua formulir kontak.
 */
export const getContactForms = async () => {
  return await prisma.contactForm.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  });
};

/**
 * Mendapatkan formulir kontak berdasarkan ID.
 * @param {number} id ID formulir kontak.
 */
export const getContactFormById = async (id: number) => {
  return await prisma.contactForm.findUnique({
    where: { id },
  });
};

/**
 * Membuat formulir kontak baru.
 * @param {CreateContactFormInput} data Data formulir kontak baru.
 */
export const createContactForm = async (data: CreateContactFormInput) => {
  return await prisma.contactForm.create({
    data,
  });
};

/**
 * Menghapus formulir kontak.
 * @param {number} id ID formulir kontak yang akan dihapus.
 */
export const deleteContactForm = async (id: number) => {
  return await prisma.contactForm.delete({
    where: { id },
  });
};
