import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// Get all student Data
const getAllStudentDB = async (query: Record<string, unknown>) => {
  console.log(query);
  const queryObj = { ...query };
  let searchTerm = '';
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((element) => ({
      [element]: { $regex: searchTerm, $options: 'i' },
    })),
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  const excludeFelid = ['searchTerm', 'sort', 'page', 'limit'];
  excludeFelid.forEach((element) => delete queryObj[element]);
  const filterQuery = searchQuery.find(queryObj);

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = await paginateQuery.limit(limit);
  return limitQuery;
};

//Get student by specific ID
const getStudentByIdDB = async (studentId: string) => {
  const result = await Student.find({ _id: studentId })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

//Update student data by specific ID
const updateStudentDB = async (payload: TStudent, studentId: string) => {
  const { name, gaurdian, localGaurdian, ...remainingStudentData } = payload;

  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }
  if (gaurdian && Object.keys(gaurdian).length) {
    for (const [key, value] of Object.entries(gaurdian)) {
      modifiedStudentData[`gaurdian.${key}`] = value;
    }
  }
  if (localGaurdian && Object.keys(localGaurdian).length) {
    for (const [key, value] of Object.entries(localGaurdian)) {
      modifiedStudentData[`localGaurdian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    { id: studentId },
    modifiedStudentData,
    { new: true },
  );
  return result;
};

//Delete student data by specific Id
const deleteStudentDB = async (studentId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Student.');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User.');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Student.');
  }
};
export const StudentServices = {
  getAllStudentDB,
  getStudentByIdDB,
  updateStudentDB,
  deleteStudentDB,
};
