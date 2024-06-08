import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import { validateSchema } from '../../middlewares/validateSchema';

const router = express.Router();

router.get('/:id', FacultyControllers.getFacultyById);

router.patch(
  '/:id',
  validateSchema(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
