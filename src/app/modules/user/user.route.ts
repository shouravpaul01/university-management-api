import express from 'express';
import { UserController } from './user.controller';
import { validateSchema } from '../../middlewares/validateSchema';
// import { UserValidations } from './user.validation';
import { StudentValidations } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateSchema(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
