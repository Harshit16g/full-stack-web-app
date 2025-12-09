"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Client } from "@/types/db"

import { PaperContainer } from "@/components/ui/paper-container"
import { PaperClip } from "@/components/ui/icons"

export function ClientsList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    fetchClients()
  }, [])

  if (loading) {
    return <div className="text-center font-hand text-xl">Loading clients...</div>
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client, index) => (
        <div
          key={client.id}
          className="h-full pt-4 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
        >
          <PaperContainer
            variant="default"
            className="h-full bg-[#FDF6E3] shadow-md hover:shadow-xl transition-all duration-300 hover-tilt group"
            rotate={index % 2 === 0 ? "left" : "right"}
          >
            <PaperClip className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 text-gray-400 group-hover:animate-wiggle" />
            <div className="flex flex-col h-full space-y-4 pt-4">
              <div className="flex items-center gap-4 border-b border-dashed border-gray-300 pb-4">
                <Avatar className="h-12 w-12 border-2 border-gray-800 transition-transform duration-300 group-hover:scale-110">
                  <AvatarImage src={client.image_url || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback className="bg-white text-primary font-hand font-bold">{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold font-hand text-lg text-primary">{client.name}</p>
                  <p className="text-sm text-muted-foreground font-hand">{client.designation}</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-foreground/80 font-hand text-lg leading-relaxed">"{client.description}"</p>
              </div>
            </div>
          </PaperContainer>
        </div>
      ))}
    </div>
  )
}
