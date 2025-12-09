"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

// Validation schemas
const contactSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+?[\d\s\-()]+$/, "Invalid phone number").min(10).max(20),
  city: z.string().min(2, "City must be at least 2 characters").max(100),
})

export async function submitContact(data: {
  full_name: string
  email: string
  mobile: string
  city: string
}) {
  // Validate input
  const validated = contactSchema.parse(data)

  const supabase = await createClient()

  const { error } = await supabase.from("contact_requests").insert([
    {
      full_name: validated.full_name,
      email: validated.email,
      mobile: validated.mobile,
      city: validated.city,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
