import { Types } from 'mongoose';

export type TAcademicDerpartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};
