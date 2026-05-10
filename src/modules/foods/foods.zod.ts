import { z } from 'zod';


// zod schemas
export const getAllFoodQuerySchema = z.object({
    category: z.string()
    .min(1, "Category cannot be empty")
    .max(50)
    .regex(/^[A-Z][a-zA-Z\s\-]*$/, "Category must start with a capital letter and contain only valid characters")
    .optional(),

    page: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

    limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100, "Limit cannot exceed 100")
    .default(10),
    })





// types
export type PaginationQuery = z.infer<typeof getAllFoodQuerySchema>;


