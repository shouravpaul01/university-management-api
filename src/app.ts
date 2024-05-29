import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { UserRoutes } from './modules/user/user.route';
import { notFound } from './middlewares/notFound';
import { AcademicSemesterRoutes } from './modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from './modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from './modules/academicDepartment/academicDepartment.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1/academic-faculty', AcademicFacultyRoutes);
app.use('/api/v1/academic-department', AcademicDepartmentRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//handle Errors
app.use(globalErrorHandler);
//Api not found handler
app.use(notFound);

export default app;
