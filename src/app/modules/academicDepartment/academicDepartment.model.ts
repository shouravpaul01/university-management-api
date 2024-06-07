import { Schema, model } from 'mongoose';
import { TAcademicDerpartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const acedemicDepartmentSchema = new Schema<TAcademicDerpartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
});

//Before create department,Check Unique department name
acedemicDepartmentSchema.pre('save', async function (next) {
  const isDepartentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Already The Department is Exists.',
    );
  }
  next();
});

//Before update department,check department id
acedemicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isDepartentExists = await AcademicDepartment.findOne(query);
  console.log(isDepartentExists);
  if (!isDepartentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'The Department dose not Exists.');
  }
  next();
});
export const AcademicDepartment = model<TAcademicDerpartment>(
  'AcademicDepartment',
  acedemicDepartmentSchema,
);
