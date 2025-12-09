"use client"

import { ProjectsList } from "@/components/admin/projects/projects-list"
import { AddProjectDialog } from "@/components/admin/projects/add-project-dialog"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ProjectsPage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleRefresh} title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <AddProjectDialog />
        </div>
      </div>
      <ProjectsList />
    </div>
  )
}
