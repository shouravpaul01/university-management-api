import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);
// semesterRegistrationSchema.statics.isAcademicSemesterExists = async function (
//   id: string,
// ) {
//   const existingAcademicSemester = await SemesterRegistration.findById(id);
//   return existingAcademicSemester;
// };
export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
