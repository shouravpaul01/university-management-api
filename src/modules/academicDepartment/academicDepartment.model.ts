import { Schema, model } from 'mongoose';
import { TAcademicDerpartment } from './academicDepartment.interface';

const acedemicDepartmentSchema = new Schema<TAcademicDerpartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFacultie',
  },
});
export const AcademicDepartment = model<TAcademicDerpartment>(
  'AcademicDepartment',
  acedemicDepartmentSchema,
);
