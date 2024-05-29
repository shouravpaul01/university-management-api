import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
//Before create Faculty,Check Unique department name
academicFacultySchema.pre('save', async function (next) {
  const isDepartentExists = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isDepartentExists) {
    throw new Error('Already The Faculty is Exists.');
  }
  next();
});

//Before update Faculty,check department id
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isDepartentExists = await AcademicFaculty.findOne(query);
  console.log(isDepartentExists);
  if (!isDepartentExists) {
    throw new Error('The Faculty dose not Exists.');
  }
  next();
});
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
