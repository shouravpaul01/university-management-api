import { z } from 'zod';
import { monthsSchema } from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'The feild is required.',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'The feild is required.',
    }),

    year: z.string({ message: 'The feild is required.' }),
    startMonth: z.enum([...monthsSchema] as [string, ...string[]], {
      message: 'The feild is required.',
    }),
    endMonth: z.enum([...monthsSchema] as [string, ...string[]], {
      message: 'The feild is required.',
    }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum(['Autumn', 'Summer', 'Fall'], {
        required_error: 'The feild is required.',
      })
      .optional(),
    code: z.enum(['01', '02', '03']).optional(),

    year: z.string().optional(),
    startMonth: z.enum([...monthsSchema] as [string, ...string[]]).optional(),
    endMonth: z.enum([...monthsSchema] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
