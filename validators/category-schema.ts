import { z } from "zod";

export const createCategorySchema = z.object({
  label: z.string().min(3, "Category must be at least 3 characters"),
});

export type NewCategoryFormValues = z.input<typeof createCategorySchema>;
