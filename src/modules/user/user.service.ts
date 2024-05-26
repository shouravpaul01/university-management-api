import config from '../../app/config';
import { TStudent } from '../student/student.interface';
import { studentModel } from '../student/student.model';
import { studentValidationSchema } from '../student/student.validation';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { userValidationSchema } from './user.validation';

//Create Student
const createStudentDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  //If password isn't given,will set default password
  userData.password = password || config.default_password;
  userData.id = '202301001';
  userData.role = 'student';
  console.log(userData);
  //Checked validation
  //   const parseUserData = userValidationSchema.parse(userData);
  //   console.log(parseUserData);
  //Create a user
  const userResult = await userModel.create(userData);

  if (Object.keys(userResult).length) {
    studentData.id = userResult.id;
    studentData.user = userResult._id;

    //Checked Validation
    // const studentParseData = studentValidationSchema.parse(studentData);
    const studentResult = await studentModel.create(studentData);
    return studentResult;
  }
};

export const UserServices = {
  createStudentDB,
};
