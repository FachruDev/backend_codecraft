import prisma from '../../utils/prisma';
import { UpdateWebSettingInput } from '../../schemas/singleton/webSetting.schema';

/**
 * Mendapatkan satu-satunya record WebSetting.
 * Menggunakan findFirst() karena mengelola data sebagai singleton.
 */
export const getWebSetting = async () => {
  return await prisma.webSetting.findFirst();
};

/**
 * Membuat atau meng-update record WebSetting.
 * Fungsi "upsert" yang memastikan hanya ada satu record.
 * @param {UpdateWebSettingInput} data Data untuk membuat atau meng-update.
 */
export const upsertWebSetting = async (data: UpdateWebSettingInput) => {
  const existingSetting = await prisma.webSetting.findFirst();

  if (existingSetting) {
    return await prisma.webSetting.update({
      where: { id: existingSetting.id },
      data,
    });
  } else {
    if (!data.title || !data.logo || !data.favicon) {
      throw new Error("Initial data for WebSetting must include title, logo, and favicon.");
    }
    return await prisma.webSetting.create({
      data: {
        title: data.title,
        logo: data.logo,
        favicon: data.favicon,
      },
    });
  }
};
