import { z } from "zod";

export const productSchema = z.object({
  itemName: z.string().min(3, "Item name must be at least 3 characters"),
  variantLabel: z.string().optional(),
  itemCode: z.string().min(1, "SKU is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Please select a category"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});

export type ProductFormValues = z.input<typeof productSchema>;
