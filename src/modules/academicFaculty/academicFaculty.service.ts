import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFacultiesDB = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};
const getAcademicFacultyByIdDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};
const updateAcademicFacultyDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  console.log(facultyId);
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const AcademicFacultyServices = {
  createAcademicFacultyDB,
  getAllAcademicFacultiesDB,
  getAcademicFacultyByIdDB,
  updateAcademicFacultyDB,
};
