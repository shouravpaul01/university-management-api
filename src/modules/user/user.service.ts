import config from '../../app/config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { studentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';

//Create Student
const createStudentDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  //If password isn't given,will set default password
  userData.password = password || config.default_password;

  const admissionSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  );
  userData.id = await generateStudentId(admissionSemester);
  userData.role = 'student';

  const newUser = await userModel.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    //Checked Validation
    // const studentParseData = studentValidationSchema.parse(studentData);
    const newStudent = await studentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentDB,
};
