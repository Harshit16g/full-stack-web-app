"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Contact } from "@/types/db"

import { useContacts } from "@/hooks/useContacts"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export function ContactsList() {
  const { contacts, loading, error } = useContacts()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching contacts",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  if (loading) {
    return <div>Loading contacts...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.full_name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.mobile}</TableCell>
              <TableCell>{contact.city}</TableCell>
              <TableCell className="max-w-xs truncate" title={contact.message || ""}>{contact.message || "-"}</TableCell>
              <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
