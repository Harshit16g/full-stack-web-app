"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function subscribeNewsletter(email: string) {
  // Validate input
  const validated = newsletterSchema.parse({ email })

  const supabase = await createClient()

  const { error } = await supabase.from("newsletter_subscribers").insert([
    {
      email: validated.email,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
