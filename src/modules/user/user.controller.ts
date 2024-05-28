import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const result = await UserServices.createStudentDB(password, student);
  res.status(200).json({
    status: true,
    message: 'Successfully user created.',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
