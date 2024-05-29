import { optional, z } from 'zod';

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'The feild is required.' }),
  }),
});
const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
export const AcademicFacultyValidation = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};
