import { ZodType, ZodError } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

type SchemaGroup = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
  headers?: ZodType;
};

/**
 * Express middleware for Zod validation
 * @param schemas - zod schemas for body, query, params, headers
 * @returns middleware that parses & validates request
 */
export const validate = (schemas: SchemaGroup): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as any;
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as any;
      }

      if (schemas.headers) {
        req.headers = schemas.headers.parse(req.headers) as any;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.issues,
        });
      }

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
};
