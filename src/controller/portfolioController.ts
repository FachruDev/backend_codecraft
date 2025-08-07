import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createPortfolioSchema, updatePortfolioSchema } from '../schemas/portfolio.schema';
import * as portfolioService from '../services/portfolioService';

/**
 * Controller untuk mendapatkan daftar semua portofolio.
 * @param {Request} req
 * @param {Response} res
 */
export const getPortfoliosController = async (req: Request, res: Response) => {
  try {
    const portfolios = await portfolioService.getPortfolios();
    res.status(200).json({ data: portfolios });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk mendapatkan portofolio berdasarkan ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getPortfolioByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid portfolio ID' });
    }

    const portfolio = await portfolioService.getPortfolioById(id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json({ data: portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk membuat portofolio baru.
 * @param {Request} req
 * @param {Response} res
 */
export const createPortfolioController = async (req: Request, res: Response) => {
  try {
    const validatedData = createPortfolioSchema.parse(req.body);
    const newPortfolio = await portfolioService.createPortfolio(validatedData);
    res.status(201).json({ data: newPortfolio, message: 'Portfolio created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error creating portfolio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk meng-update portofolio.
 * @param {Request} req
 * @param {Response} res
 */
export const updatePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid portfolio ID' });
    }

    const validatedData = updatePortfolioSchema.parse(req.body);
    const updatedPortfolio = await portfolioService.updatePortfolio(id, validatedData);

    res.status(200).json({ data: updatedPortfolio, message: 'Portfolio updated successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.issues });
    }
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller untuk menghapus portofolio.
 * @param {Request} req
 * @param {Response} res
 */
export const deletePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid portfolio ID' });
    }

    await portfolioService.deletePortfolio(id);
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
