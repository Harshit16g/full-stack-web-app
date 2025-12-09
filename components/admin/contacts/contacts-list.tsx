"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Contact = {
  id: string
  full_name: string
  email: string
  mobile: string
  city: string
  created_at: string
}

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching contacts:", error)
      } else {
        setContacts(data || [])
      }
      setLoading(false)
    }

    fetchContacts()
  }, [])

  if (loading) {
    return <div className="text-center">Loading contacts...</div>
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
              <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
