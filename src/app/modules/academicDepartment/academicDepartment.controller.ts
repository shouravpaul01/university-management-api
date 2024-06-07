import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDeratment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDeratmentDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Created Academic Department.',
    data: result,
  });
});
const getAllAcademicDeratments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDeratmentsDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Fetched Academic Departments.',
    data: result,
  });
});
const getAcademicDeratmentById = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getAcademicDeratmentByIdDB(departmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Fetched Academic Department.',
    data: result,
  });
});
const updateAcademicDeratment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await AcademicDepartmentServices.updateAcademicDeratmentDB(
    departmentId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Updated Academic Department.',
    data: result,
  });
});
export const AcademicDepartmentControllers = {
  createAcademicDeratment,
  getAllAcademicDeratments,
  getAcademicDeratmentById,
  updateAcademicDeratment,
};
