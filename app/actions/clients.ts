"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

// Validation schemas
const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  designation: z.string().min(2, "Designation must be at least 2 characters").max(100),
  image_url: z.string().url("Invalid image URL"),
})

const uuidSchema = z.string().uuid("Invalid ID format")

export async function addClient(data: {
  name: string
  description: string
  designation: string
  image_url: string
}) {
  // Validate input
  const validated = clientSchema.parse(data)

  const supabase = await createClient()

  const { data: client, error } = await supabase
    .from("clients")
    .insert([
      {
        name: validated.name,
        description: validated.description,
        designation: validated.designation,
        image_url: validated.image_url,
      },
    ])
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return client?.[0]
}

export async function deleteClient(id: string) {
  // Validate ID
  const validatedId = uuidSchema.parse(id)

  const supabase = await createClient()

  const { error } = await supabase.from("clients").delete().eq("id", validatedId)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function updateClient(
  id: string,
  data: {
    name: string
    description: string
    designation: string
    image_url: string
  }
) {
  // Validate input
  const validated = clientSchema.parse(data)
  const validatedId = uuidSchema.parse(id)

  const supabase = await createClient()

  const { data: client, error } = await supabase
    .from("clients")
    .update({
      name: validated.name,
      description: validated.description,
      designation: validated.designation,
      image_url: validated.image_url,
    })
    .eq("id", validatedId)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return client?.[0]
}
