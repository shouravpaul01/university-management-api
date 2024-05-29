import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// Get all student Data
const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully fetched All Students.',
    data: result,
  });
});

//Get student by specific ID
const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentByIdDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully fetched  Student.',
    data: result,
  });
});

//Update student data by specific ID
const updateStudent = catchAsync(async (req, res) => {
  const student = req.body;
  const { studentId } = req.params;
  console.log(student);
  const result = await StudentServices.updateStudentDB(student, studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully Updated Student.',
    data: result,
  });
});

//Delete student data by specific Id
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully Deleted Student.',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
