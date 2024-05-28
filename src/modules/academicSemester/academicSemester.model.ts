import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';
import { monthsSchema } from './academicSemester.constant';

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
  const isSemesterExists = await academicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error('Semester already exists.');
  }
  next();
});
export const academicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
