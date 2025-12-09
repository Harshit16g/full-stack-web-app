"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { updateProject } from "@/app/actions/projects"
import { ImageUploader } from "@/components/image-uploader"
import { useToast } from "@/hooks/use-toast"

const projectSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    image_url: z.string().url(),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface EditProjectDialogProps {
    project: {
        id: string
        name: string
        description: string
        image_url: string
    }
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditProjectDialog({ project, open, onOpenChange }: EditProjectDialogProps) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
            image_url: project.image_url,
        },
    })

    // Update form when project changes
    useEffect(() => {
        form.reset({
            name: project.name,
            description: project.description,
            image_url: project.image_url,
        })
    }, [project, form])

    async function onSubmit(data: ProjectFormData) {
        setLoading(true)
        try {
            await updateProject(project.id, data)
            toast({
                title: "Success",
                description: "Project updated successfully",
            })
            onOpenChange(false)
            // Trigger a refresh
            window.location.reload()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update project",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Project name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Project description" rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Image</FormLabel>
                                    <ImageUploader value={field.value} onChange={field.onChange} aspectRatio={450 / 350} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Update Project"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
