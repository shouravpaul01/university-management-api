import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateSchema(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/', AcademicSemesterController.getAllAcademicSemester);
router.get('/:semesterId', AcademicSemesterController.getAcademicSemesterById);
router.patch(
  '/:semesterId',
  validateSchema(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
