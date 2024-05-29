import express from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateSchema(
    AcademicDepartmentValidation.createAcademicDeratmentValidation,
  ),
  AcademicDepartmentControllers.createAcademicDeratment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDeratments);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getAcademicDeratmentById,
);
router.patch(
  '/:departmentId',
  AcademicDepartmentControllers.updateAcademicDeratment,
);

export const AcademicDepartmentRoutes = router;
