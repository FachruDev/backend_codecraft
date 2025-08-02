import { Request, Response } from 'express';
import { getWebSetting, upsertWebSetting } from '../../services/singleton/webSettingService';
import { updateWebSettingSchema } from '../../schemas/singleton/webSetting.schema';
import { ZodError } from 'zod';

/**
 * Controller untuk mendapatkan satu-satunya data WebSetting.
 * @param {Request} req
 * @param {Response} res
 */
export const getWebSettingData = async (req: Request, res: Response) => {
  try {
    const webSetting = await getWebSetting();

    if (!webSetting) {
      return res.status(404).json({ message: 'Web setting data not found' });
    }

    res.status(200).json({ data: webSetting });
  } catch (error) {
    console.error('Error fetching web setting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat atau meng-update data WebSetting.
 * @param {Request} req
 * @param {Response} res
 */
export const upsertWebSettingData = async (req: Request, res: Response) => {
  try {
    const validatedData = updateWebSettingSchema.parse(req.body);
    const updatedWebSetting = await upsertWebSetting(validatedData);

    res.status(200).json({ data: updatedWebSetting, message: 'Web setting data updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error in upsert web setting data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
