import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterDB(
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Successfully Created Semester.',
    data: result,
  });
});
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterDB();
  res.status(200).json({
    status: true,
    message: 'Successfully fetched all  Semester.',
    data: result,
  });
});
const getAcademicSemesterById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.getAcademicSemesterByIdDB(id);
  res.status(200).json({
    status: true,
    message: 'Successfully fetched Semester By Id.',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterDB(
    id,
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Successfully Updated Semester.',
    data: result,
  });
});
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemester,
};
