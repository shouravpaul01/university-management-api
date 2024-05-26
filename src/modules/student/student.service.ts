import { TStudent } from './student.interface';
import { studentModel } from './student.model';

// Get all student Data
const getAllStudentDB = async () => {
  const result = await studentModel.find({});
  return result;
};

//Get student by specific ID
const getStudentByIdDB = async (studentId: string) => {
  const result = await studentModel.find({ _id: studentId });
  return result;
};

//Update student data by specific ID
const updateStudentDB = async (studentData: TStudent, studentId: string) => {
  console.log(studentData);
  const result = await studentModel.findByIdAndUpdate(studentId, studentData);
  return result;
};

//Delete student data by specific Id
const deleteStudentDB = async (studentId: string) => {
  const result = await studentModel.deleteOne({ _id: studentId });
  return result;
};
export const StudentServices = {
  getAllStudentDB,
  getStudentByIdDB,
  updateStudentDB,
  deleteStudentDB,
};
