import { createClient } from "@/lib/supabase/server"
import { Contact } from "@/types/db"

export type CreateContactDTO = Omit<Contact, "id" | "created_at">

export async function createContact(data: CreateContactDTO) {
    const supabase = await createClient()

    const { error } = await supabase.from("contact_requests").insert([data])

    if (error) {
        throw new Error(error.message)
    }

    return { success: true }
}

export async function getRecentContacts(limit = 5) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)

    if (error) {
        throw new Error(error.message)
    }

    return data as Contact[]
}
