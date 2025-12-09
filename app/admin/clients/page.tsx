import { ClientsList } from "@/components/admin/clients/clients-list"
import { AddClientDialog } from "@/components/admin/clients/add-client-dialog"

export default function ClientsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your clients</p>
        </div>
        <AddClientDialog />
      </div>
      <ClientsList />
    </div>
  )
}
