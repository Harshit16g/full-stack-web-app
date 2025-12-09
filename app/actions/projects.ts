"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

// Validation schemas
const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  image_url: z.string().url("Invalid image URL"),
})

const uuidSchema = z.string().uuid("Invalid ID format")

export async function addProject(data: {
  name: string
  description: string
  image_url: string
}) {
  // Validate input
  const validated = projectSchema.parse(data)

  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from("projects")
    .insert([
      {
        name: validated.name,
        description: validated.description,
        image_url: validated.image_url,
      },
    ])
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return project?.[0]
}

export async function deleteProject(id: string) {
  // Validate ID
  const validatedId = uuidSchema.parse(id)

  const supabase = await createClient()

  const { error } = await supabase.from("projects").delete().eq("id", validatedId)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function updateProject(
  id: string,
  data: {
    name: string
    description: string
    image_url: string
  }
) {
  // Validate input
  const validated = projectSchema.parse(data)
  const validatedId = uuidSchema.parse(id)

  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from("projects")
    .update({
      name: validated.name,
      description: validated.description,
      image_url: validated.image_url,
    })
    .eq("id", validatedId)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return project?.[0]
}
