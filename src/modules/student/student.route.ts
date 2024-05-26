import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.post('/', StudentController.createStudent);
router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getStudentById);
router.put('/:studentId', StudentController.updateStudent);

export const StudentRoutes = router;
