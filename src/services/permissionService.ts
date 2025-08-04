import prisma from "../utils/prisma";

/**
 * Mendapatkan daftar semua permission dari database.
 */
export const getAllPermissions = async () => {
  return await prisma.permission.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};
