import { Types } from 'mongoose';
import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'The field is required.' }),
  middleName: z.string(),
  lastName: z.string({ required_error: 'The field is required.' }),
});
const updatUserNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'The field is required.' }).optional(),
  middleName: z.string().optional().optional(),
  lastName: z.string({ required_error: 'The field is required.' }).optional(),
});

const gaurdianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'The field is required.' }),
  fatherOccupation: z.string({ required_error: 'The field is required.' }),
  fatherContactNo: z.string({ required_error: 'The field is required.' }),
  motherName: z.string({ required_error: 'The field is required.' }),
  motherOccupation: z.string({ required_error: 'The field is required.' }),
  motherContactNo: z.string({ required_error: 'The field is required.' }),
});
const updateGaurdianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'The field is required.' }).optional(),
  fatherOccupation: z
    .string({ required_error: 'The field is required.' })
    .optional(),
  fatherContactNo: z
    .string({ required_error: 'The field is required.' })
    .optional(),
  motherName: z.string({ required_error: 'The field is required.' }).optional(),
  motherOccupation: z
    .string({ required_error: 'The field is required.' })
    .optional(),
  motherContactNo: z
    .string({ required_error: 'The field is required.' })
    .optional(),
});
const localGaurdianValidationSchema = z.object({
  name: z.string({ required_error: 'The field is required.' }),
  occupation: z.string({ required_error: 'The field is required.' }),
  contactNo: z.string({ required_error: 'The field is required.' }),
  address: z.string({ required_error: 'The field is required.' }),
});
const updateLocalGaurdianValidationSchema = z.object({
  name: z.string({ required_error: 'The field is required.' }).optional(),
  occupation: z.string({ required_error: 'The field is required.' }).optional(),
  contactNo: z.string({ required_error: 'The field is required.' }).optional(),
  address: z.string({ required_error: 'The field is required.' }).optional(),
});
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      user: z.string().optional(),
      name: userNameValidationSchema,
      profileImg: z.string().url().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
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
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    name: updatUserNameValidationSchema,
    profileImg: z.string().url().optional(),
    admissionSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    gender: z
      .enum(['male', 'female', 'others'], {
        message: 'The field is required.',
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().optional(),
    parmanentAddress: z.string().optional(),
    gaurdian: updateGaurdianValidationSchema.optional(),
    localGaurdian: updateLocalGaurdianValidationSchema.optional(),
  }),
});
export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
