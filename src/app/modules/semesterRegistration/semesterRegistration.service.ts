import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import {
  registrationStatus,
  semesterRegistrationSearchableFields,
} from './semesterRegistration.constant';

const createSemesterRegistratioIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.UPCOMING },
        { status: registrationStatus.ONGOING },
      ],
    });
  //Check if there any registered semester that is already 'upcoming' or 'ongoing'.
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      '',
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester registered!`,
    );
  }
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  //Check if academic semester is exists
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      '',
      'This Academic Semester not found.',
    );
  }
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  //Check if semester registration
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      '',
      'This semester already esists.',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const courseQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .search(semesterRegistrationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSemesterRegistrationByIdFromDB = async (
  semesterRegistrationId: string,
) => {
  const result = await SemesterRegistration.findById(
    semesterRegistrationId,
  ).populate('academicSemester');
  return result;
};
const updateSemesterRegistrationIntroDB = async (
  semesterRegistrationId: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const requestedSemesterStatus = payload?.status;
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistrationId,
  );
  //Check if semester registration
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, '', 'The semester is not found.');
  }
  // If the rquested semester registration is ended,we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  if (currentSemesterStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      '',
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === registrationStatus.UPCOMING &&
    requestedSemesterStatus === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      '',
      `You can not directly update ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }
  if (
    currentSemesterStatus === registrationStatus.ONGOING &&
    requestedSemesterStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      '',
      `You can not directly update ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(
    semesterRegistrationId,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistratioIntoDB,
  getAllSemesterRegistrationFromDB,
  getSemesterRegistrationByIdFromDB,
  updateSemesterRegistrationIntroDB,
};
