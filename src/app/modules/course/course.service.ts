import mongoose, { startSession } from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntroDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getCourseByIdFromDB = async (courseId: string) => {
  const result = await Course.findById(courseId);
  return result;
};
const updateCourseIntroDB = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...remainingCourseInfo } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      courseId,
      remainingCourseInfo,
      { new: true, session },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        '',
        'Failed to Update Course.',
      );
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((element) => element.course && element.isDeleted)
        .map((element) => element.course);

      //Deleted Pre Requisite courses
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisites },
            },
          },
        },
        { new: true, session },
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          '',
          'Failed to Update Course.',
        );
      }
      //Add  Pre Requisite courses
      const newPreRequisites = preRequisiteCourses.filter(
        (element) => element.course && !element.isDeleted,
      );
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisites,
            },
          },
        },
        { new: true, session },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          '',
          'Failed to Update Course.',
        );
      }
    }
    const result = await Course.findById(courseId).populate(
      'preRequisiteCourses.course',
    );
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};
const deleteCourseDB = async (courseId: string) => {
  const result = await Course.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const assignFacultiesWithCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    { upsert: true, new: true },
  );
  return result;
};
const removeFacultiesFromCourseFromDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    {
      $pull: {
        faculties: { $in: payload },
      },
    },
    { new: true },
  );
  return result;
};
export const CourseServices = {
  createCourseIntroDB,
  getAllCoursesFromDB,
  getCourseByIdFromDB,
  updateCourseIntroDB,
  deleteCourseDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
