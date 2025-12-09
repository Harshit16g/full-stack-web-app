"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { deleteClient } from "@/app/actions/clients"
import { useToast } from "@/hooks/use-toast"
import { EditClientDialog } from "./edit-client-dialog"

type Client = {
  id: string
  name: string
  description: string
  designation: string
  image_url: string
  created_at: string
}

export function ClientsList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const { toast } = useToast()

  const fetchClients = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching clients:", error)
    } else {
      setClients(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id)
        setClients(clients.filter((c) => c.id !== id))
        toast({
          title: "Success",
          description: "Client deleted successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete client",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return <div className="text-center">Loading clients...</div>
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.designation}</TableCell>
                <TableCell>{client.description?.substring(0, 30)}...</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingClient(client)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(client.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingClient && (
        <EditClientDialog
          client={editingClient}
          open={!!editingClient}
          onOpenChange={(open) => {
            if (!open) setEditingClient(null)
          }}
        />
      )}
    </>
  )
}
