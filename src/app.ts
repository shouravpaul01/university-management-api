import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
import { notFound } from './app/middlewares/notFound';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from './app/modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from './app/modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from './app/modules/faculty/faculty.route';
import { CourseRoutes } from './app/modules/course/course.route';
import { SemesterRegistrationRoutes } from './app/modules/semesterRegistration/semesterRegistration.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1/academic-faculty', AcademicFacultyRoutes);
app.use('/api/v1/academic-department', AcademicDepartmentRoutes);
app.use('/api/v1/faculties', FacultyRoutes);
app.use('/api/v1/courses', CourseRoutes);
app.use('/api/v1/semester-registrations', SemesterRegistrationRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//handle Errors
app.use(globalErrorHandler);
//Api not found handler
app.use(notFound);

export default app;
