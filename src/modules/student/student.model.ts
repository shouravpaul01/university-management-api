import { Schema, model } from 'mongoose';
import {
  TGaurdian,
  TLocalGaurdian,
  TStudent,
  TUserName,
} from './student.interface';

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
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: userNameSchema,
    profileImg: { type: String },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: [true, 'The feild is required.'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'The feild is required.'],
    },
    email: {
      type: String,
      required: [true, 'The feild is required.'],
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

export const studentModel = model<TStudent>('Student', studentSchema);
