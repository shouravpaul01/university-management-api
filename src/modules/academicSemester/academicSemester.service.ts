import { academicSemesterCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  //Before creating a new semester, check if the same semester and semester code do not already exist.
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code.');
  }
  const result = await academicSemesterModel.create(payload);
  return result;
};
const getAllAcademicSemesterDB = async () => {
  const result = await academicSemesterModel.find({});
  return result;
};
const getAcademicSemesterByIdDB = async (id: string) => {
  const result = await academicSemesterModel.findById(id);
  return result;
};
const updateAcademicSemesterDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code.');
  }
  const result = await academicSemesterModel.findByIdAndUpdate(id, payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterDB,
  getAllAcademicSemesterDB,
  getAcademicSemesterByIdDB,
  updateAcademicSemesterDB,
};
