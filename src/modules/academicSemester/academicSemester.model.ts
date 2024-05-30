import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';
import { monthsSchema } from './academicSemester.constant';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summer', 'Fall'],
      required: true,
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: monthsSchema,
      required: true,
    },
    endMonth: {
      type: String,
      enum: monthsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//Check if the semester exists before creating the data.
academicSemesterSchema.pre('save', async function (next) {
  console.log(this);
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester already exists.');
  }
  next();
});
export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
