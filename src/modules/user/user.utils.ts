import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  console.log(lastStudent);
  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester | null) => {
  let currentId = (0).toString().padStart(4, '0');

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentStudentSemesterCode = payload?.code;
  const currentStudentSemesterYear = payload?.year;
  console.log(
    lastStudentId,
    lastStudentSemesterCode,
    lastStudentSemesterYear,
    currentStudentSemesterCode,
    currentStudentSemesterYear,
  );
  //Check same semester and same year
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesterYear == currentStudentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload?.year}${payload?.code}${incrementId}`;
  console.log(currentId, incrementId);
  return incrementId;
};
