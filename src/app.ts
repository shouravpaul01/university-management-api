import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { UserRoutes } from './modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
//handle Errors
app.use(globalErrorHandler);

export default app;
