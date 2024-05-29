import config from '../../app/config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

//Create Student
const createStudentDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  //If password isn't given,will set default password
  userData.password = password || config.default_password;

  const admissionSemester: TAcademicSemester | null =
    await AcademicSemester.findById(studentData.admissionSemester);
  userData.id = await generateStudentId(admissionSemester);
  userData.role = 'student';

  //Create new User
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    //Checked Validation
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentDB,
};
