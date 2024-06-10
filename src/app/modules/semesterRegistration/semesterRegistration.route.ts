import express from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateSchema(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistrationInto,
);
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  '/:semesterRegistrationId',
  SemesterRegistrationControllers.getSemesterRegistrationById,
);
router.patch(
  '/:semesterRegistrationId',
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
