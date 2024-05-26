import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = error?.message || 'Something went to wrong';
  return res.status(500).json({
    status: false,
    message,
    error: error,
  });
};
