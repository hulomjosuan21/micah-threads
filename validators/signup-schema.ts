import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    contactNumber: z
      .string()
      .min(11, "Contact number must be at least 11 digits"),
    address: z.string().min(1, "Address is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
