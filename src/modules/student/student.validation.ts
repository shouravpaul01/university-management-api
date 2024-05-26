import { Types } from 'mongoose';
import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'The field is required.' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'The field is required.' }),
});

const gaurdianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'The field is required.' }),
  fatherOccupation: z.string({ required_error: 'The field is required.' }),
  fatherContactNo: z.string({ required_error: 'The field is required.' }),
  motherName: z.string({ required_error: 'The field is required.' }),
  motherOccupation: z.string({ required_error: 'The field is required.' }),
  motherContactNo: z.string({ required_error: 'The field is required.' }),
});

const localGaurdianValidationSchema = z.object({
  name: z.string({ required_error: 'The field is required.' }),
  occupation: z.string({ required_error: 'The field is required.' }),
  contactNo: z.string({ required_error: 'The field is required.' }),
  address: z.string({ required_error: 'The field is required.' }),
});

export const studentValidationSchema = z.object({
  id: z.string({ required_error: 'The field is required.' }),
  user: z
    .string({ required_error: 'The field is required.' })
    .refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid ObjectId',
    }),
  name: userNameValidationSchema,
  profileImg: z.string().url().optional(),
  gender: z.enum(['male', 'female', 'others'], {
    message: 'The field is required.',
  }),
  dateOfBirth: z.string({ required_error: 'The field is required.' }),
  email: z.string().email({ message: 'The field is required.' }),
  contactNo: z.string({ required_error: 'The field is required.' }),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string({ required_error: 'The field is required.' }),
  parmanentAddress: z.string({ required_error: 'The field is required.' }),
  gaurdian: gaurdianValidationSchema,
  localGaurdian: localGaurdianValidationSchema,
});
