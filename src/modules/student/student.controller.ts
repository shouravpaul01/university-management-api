import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

// Get all student Data
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentDB();
    res.status(200).json({
      status: true,
      message: 'Succesfully fetched All Students',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Get student by specific ID
const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentByIdDB(studentId);

    res.status(200).json({
      status: true,
      message: 'Succesfully fetched All Students',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Update student data by specific ID
const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = req.body;
    const { studentId } = req.params;
    console.log(student);
    const result = await StudentServices.updateStudentDB(student, studentId);
    res.status(200).json({
      status: true,
      message: 'Succesfully Updated Student',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Delete student data by specific Id
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentDB(studentId);
    res.status(200).json({
      status: true,
      message: 'Succesfully Deleted Student',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
