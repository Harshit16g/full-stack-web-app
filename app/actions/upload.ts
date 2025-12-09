"use server"

import { createClient } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

// Validation schema for file upload
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File

  if (!file) {
    throw new Error("No file provided")
  }

  // Validate file
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must be less than 5MB")
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, and WebP images are allowed")
  }

  const supabase = await createClient()
  const filename = `${uuidv4()}.jpg`

  const { data, error } = await supabase.storage.from("projects").upload(filename, file, {
    contentType: "image/jpeg",
  })

  if (error) {
    throw new Error(error.message)
  }

  const { data: urlData } = supabase.storage.from("projects").getPublicUrl(filename)

  return urlData.publicUrl
}
