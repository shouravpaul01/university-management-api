import express from 'express';
import { UserController } from './user.controller';
import { validateSchema } from '../../middlewares/validateSchema';
// import { UserValidations } from './user.validation';
import { StudentValidations } from '../student/student.validation';
import { FacultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateSchema(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateSchema(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRoutes = router;
