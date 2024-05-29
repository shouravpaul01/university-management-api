import { TAcademicDerpartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDeratmentDB = async (payload: TAcademicDerpartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDeratmentsDB = async () => {
  const result = await AcademicDepartment.find({}).populate('academicFaculty');
  return result;
};
const getAcademicDeratmentByIdDB = async (departmentId: string) => {
  const result =
    await AcademicDepartment.findById(departmentId).populate('academicFaculty');
  return result;
};
const updateAcademicDeratmentDB = async (
  departmentId: string,
  payload: TAcademicDerpartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  );
  return result;
};
export const AcademicDepartmentServices = {
  createAcademicDeratmentDB,
  getAllAcademicDeratmentsDB,
  getAcademicDeratmentByIdDB,
  updateAcademicDeratmentDB,
};
