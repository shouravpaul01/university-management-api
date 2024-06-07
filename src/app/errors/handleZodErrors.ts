import { ZodError, ZodIssue, map } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';
import httpStatus from 'http-status';

const handleZodErrors = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = error?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleZodErrors;
