"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Project } from "@/types/db"

import { PaperContainer } from "@/components/ui/paper-container"

import { useProjects } from "@/hooks/useProjects"
import { useToast } from "@/hooks/use-toast"

export function ProjectsList() {
  const { projects, loading, error } = useProjects()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading projects",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  if (loading) {
    return <div className="text-center font-hand text-xl">Loading projects...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 font-hand">Error loading projects</div>
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="h-full animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
        >
          <PaperContainer
            variant="polaroid"
            rotate={index % 2 === 0 ? "left" : "right"}
            className="h-full flex flex-col hover:z-20 transition-all duration-300 hover-tilt group"
          >
            {project.image_url && (
              <div className="aspect-video w-full overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                <Image src={project.image_url || "/placeholder.svg"} alt={project.name} width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold font-hand mb-2 text-primary">{project.name}</h3>
              <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-3">{project.description}</p>
              <Button variant="ghost" className="w-full tape-strip text-primary-foreground font-hand text-lg h-10 mt-auto hover:bg-secondary/90 hover:scale-[1.02] transition-transform shadow-sm" aria-label={`Read more about ${project.name}`}>
                Read More
              </Button>
            </div>
          </PaperContainer>
        </div>
      ))}
    </div>
  )
}
