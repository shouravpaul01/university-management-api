import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getStudentById);
router.put('/:studentId', StudentController.updateStudent);
router.put('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
