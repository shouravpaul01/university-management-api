import express from 'express';
import { StudentController } from './student.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { StudentValidations } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getStudentById);
router.patch(
  '/:studentId',
  validateSchema(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
