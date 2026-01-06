import { z } from "zod";

// Zod schema for quantity validation
export const cartItemFormSchema = z.object({
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity cannot exceed 99")
    .int("Quantity must be a whole number"),
});

export type CartItemFormData = z.infer<typeof cartItemFormSchema>;