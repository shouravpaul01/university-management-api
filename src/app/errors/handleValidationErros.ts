import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';
import httpStatus from 'http-status';

const handleValidationErrors = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Mongoose Validation Error',
    errorSources,
  };
};

export default handleValidationErrors;
