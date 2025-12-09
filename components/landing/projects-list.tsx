"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Project = {
  id: string
  name: string
  description: string
  image_url: string
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching projects:", error)
      } else {
        setProjects(data || [])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <div className="text-center">Loading projects...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          {project.image_url && (
            <img
              src={project.image_url || "/placeholder.svg"}
              alt={project.name}
              className="h-48 w-full object-cover"
            />
          )}
          <CardHeader>
            <CardTitle className="text-xl">{project.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            <Button variant="outline" className="w-full bg-transparent">
              Read More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
