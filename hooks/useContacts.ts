"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Contact } from "@/types/db"

export function useContacts() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from("contact_requests")
                    .select("*")
                    .order("created_at", { ascending: false })

                if (error) {
                    throw error
                }

                setContacts(data || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchContacts()
    }, [])

    return { contacts, loading, error }
}
