import express from 'express';
import { UserController } from './user.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateSchema(UserValidations.createUserValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
