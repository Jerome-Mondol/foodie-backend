import { z } from 'zod';

export const getAllFoodQueryValidation = z.string()
    .min(1, "Category cannot be empty")
    .max(50)
    .regex(/^[A-Z][a-zA-Z\s\-]*$/, "Category must start with a capital letter and contain only valid characters")
    .optional()

