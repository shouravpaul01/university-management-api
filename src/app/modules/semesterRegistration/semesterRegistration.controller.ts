import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistrationInto = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistratioIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Created.',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Retrieved.',
    data: result,
  });
});
const getSemesterRegistrationById = catchAsync(async (req, res) => {
  const { semesterRegistrationId } = req.params;
  const result =
    await SemesterRegistrationServices.getSemesterRegistrationByIdFromDB(
      semesterRegistrationId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Retrieved.',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterRegistrationId } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntroDB(
      semesterRegistrationId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully.',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistrationInto,
  getAllSemesterRegistration,
  getSemesterRegistrationById,
  updateSemesterRegistration,
};
