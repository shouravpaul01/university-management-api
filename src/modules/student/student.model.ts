import { Schema, model } from 'mongoose';
import {
  TGaurdian,
  TLocalGaurdian,
  TStudent,
  TUserName,
} from './student.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'The feild is required.'],
  },
});
const gaurdianSchema = new Schema<TGaurdian>({
  fatherName: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  motherName: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'The feild is required.'],
  },
});
const localGaurdianSchema = new Schema<TLocalGaurdian>({
  name: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'The feild is required.'],
  },
  address: {
    type: String,
    required: [true, 'The feild is required.'],
  },
});
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: userNameSchema,
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'The feild is required.'],
    },
    emergencyContactNo: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
    },
    parmanentAddress: {
      type: String,
    },
    gaurdian: gaurdianSchema,
    localGaurdian: localGaurdianSchema,
  },
  {
    timestamps: true,
  },
);
studentSchema.pre('save', async function (next) {
  const isEmailExists = await Student.findOne({ email: this.email });

  if (isEmailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'The Email already exists.');
  }
  next();
});
//Before update Faculty,check department id
studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartentExists = await Student.findOne(query);
  if (!isDepartentExists) {
    console.log(query);
    throw new AppError(httpStatus.NOT_FOUND, 'Student dose not Exists.');
  }
  next();
});
export const Student = model<TStudent>('Student', studentSchema);
