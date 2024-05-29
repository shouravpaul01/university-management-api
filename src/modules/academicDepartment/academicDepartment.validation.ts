import { z } from 'zod';

const createAcademicDeratmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'The feild must be a string.',
      required_error: 'The feild is required.',
    }),
    academicFaculty: z.string({ required_error: 'The feild is required.' }),
  }),
});
const updateAcademicDeratmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'The feild must be a string.',
        required_error: 'The feild is required.',
      })
      .optional(),
    academicFaculty: z
      .string({ required_error: 'The feild is required.' })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDeratmentValidation,
  updateAcademicDeratmentValidation,
};
