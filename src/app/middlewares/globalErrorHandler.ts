import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import handleZodErrors from '../errors/handleZodErrors';
import { TErrorSources } from '../interfaces/error';
import handleValidationErrors from '../errors/handleValidationErros';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went to wrong';

  let errorSourses: TErrorSources = [
    {
      path: '',
      message: 'Something  wrong',
    },
  ];

  if (error instanceof ZodError) {
    const semplifiedErrors = handleZodErrors(error);
    statusCode = semplifiedErrors.statusCode;
    message = semplifiedErrors.message;
    errorSourses = semplifiedErrors.errorSources;
  } else if (error?.name == 'ValidationError') {
    const semplifiedErrors = handleValidationErrors(error);
    statusCode = semplifiedErrors.statusCode;
    message = semplifiedErrors.message;
    errorSourses = semplifiedErrors.errorSources;
  } else if (error?.name == 'CastError') {
    const semplifiedErrors = handleCastError(error);
    statusCode = semplifiedErrors.statusCode;
    message = semplifiedErrors.message;
    errorSourses = semplifiedErrors.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSourses = [
      {
        path: error?.path || '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSourses = [
      {
        path: '',
        message: error.message,
      },
    ];
  }
  return res.status(statusCode).json({
    status: false,
    message,
    errorSourses,
    stack: null,
    // error: error,
  });
};
