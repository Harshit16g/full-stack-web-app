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
import { updateClient } from "@/app/actions/clients"
import { ImageUploader } from "@/components/image-uploader"
import { useToast } from "@/hooks/use-toast"

const clientSchema = z.object({
    name: z.string().min(2),
    designation: z.string().min(2),
    description: z.string().min(10),
    image_url: z.string().url(),
})

type ClientFormData = z.infer<typeof clientSchema>

interface EditClientDialogProps {
    client: {
        id: string
        name: string
        designation: string
        description: string
        image_url: string
    }
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditClientDialog({ client, open, onOpenChange }: EditClientDialogProps) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: client.name,
            designation: client.designation,
            description: client.description,
            image_url: client.image_url,
        },
    })

    // Update form when client changes
    useEffect(() => {
        form.reset({
            name: client.name,
            designation: client.designation,
            description: client.description,
            image_url: client.image_url,
        })
    }, [client, form])

    async function onSubmit(data: ClientFormData) {
        setLoading(true)
        try {
            await updateClient(client.id, data)
            toast({
                title: "Success",
                description: "Client updated successfully",
            })
            onOpenChange(false)
            // Trigger a refresh
            window.location.reload()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update client",
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
                    <DialogTitle>Edit Client</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="image_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Image</FormLabel>
                                    <ImageUploader value={field.value} onChange={field.onChange} aspectRatio={1} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Client name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CEO, Designer, etc." {...field} />
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
                                    <FormLabel>Testimonial</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Client testimonial" rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Update Client"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
