import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const notFound = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: 'Not Found !!',
    error: '',
  });
};
