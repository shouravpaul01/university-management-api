import { academicSemesterCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  //Before creating a new semester, check if the same semester and semester code do not already exist.
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code.');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};
const getAcademicSemesterByIdDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateAcademicSemesterDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  //Before updating a  semester, check if the same semester and semester code do not already exist.
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code.');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterDB,
  getAllAcademicSemesterDB,
  getAcademicSemesterByIdDB,
  updateAcademicSemesterDB,
};
