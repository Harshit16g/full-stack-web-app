"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Project } from "@/types/db"

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .order("created_at", { ascending: false })

                if (error) {
                    throw error
                }

                setProjects(data || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    return { projects, loading, error }
}
