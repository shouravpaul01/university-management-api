import mongoose from 'mongoose';
import config from '../../app/config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

//Create User with Student
const createStudentDB = async (password: string, studentData: TStudent) => {
  //Craete session
  const session = await mongoose.startSession();
  const userData: Partial<TUser> = {};

  //If password isn't given,will set default password
  userData.password = password || config.default_password;

  const admissionSemester: TAcademicSemester | null =
    await AcademicSemester.findById(studentData.admissionSemester);
  userData.id = await generateStudentId(admissionSemester);
  userData.role = 'student';
  try {
    // console.log(studentData, userData, 'studen');
    //Start session
    session.startTransaction();
    //Create new User
    const newUser = await User.create([userData], { session });
    console.log(newUser, '3');
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    console.log(studentData, '4');
    //Create student
    const newStudent = await Student.create([studentData], { session });
    console.log(newStudent, '5');
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    console.log('2');
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
  }
};

export const UserServices = {
  createStudentDB,
};
