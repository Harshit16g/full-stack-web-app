"use server"

import { createContact } from "@/services/contact"
import { z } from "zod"

// Validation schemas
const contactSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+?[\d\s\-()]+$/, "Invalid phone number").min(10).max(20),
  city: z.string().min(2, "City must be at least 2 characters").max(100),
  message: z.string().optional(),
})

export async function submitContact(data: {
  full_name: string
  email: string
  mobile: string
  city: string
  message?: string
}) {
  // Validate input
  const validated = contactSchema.parse(data)

  await createContact({
    full_name: validated.full_name,
    email: validated.email,
    mobile: validated.mobile,
    city: validated.city,
    message: validated.message,
  } as any) // Casting to any for now until we fix the type in the next step

  return { success: true }
}
