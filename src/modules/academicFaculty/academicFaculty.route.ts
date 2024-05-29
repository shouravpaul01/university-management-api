import express from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateSchema(AcademicFacultyValidation.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllers.getAcademicFacultyById);
router.patch(
  '/:facultyId',
  validateSchema(AcademicFacultyValidation.updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
