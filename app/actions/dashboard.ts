"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardStats() {
    const supabase = await createClient()

    // Fetch counts for all tables in parallel
    const [projectsResult, clientsResult, contactsResult, subscribersResult] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("contact_requests").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    ])

    return {
        projects: projectsResult.count || 0,
        clients: clientsResult.count || 0,
        contacts: contactsResult.count || 0,
        subscribers: subscribersResult.count || 0,
    }
}
