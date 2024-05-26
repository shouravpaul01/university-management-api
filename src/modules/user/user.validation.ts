import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string.',
    })
    .max(20, { message: 'Passaord can not be more than 15 charecters.' })
    .optional(),
});
