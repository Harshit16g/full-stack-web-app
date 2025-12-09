import { getDashboardStats } from "@/app/actions/dashboard"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Projects</h3>
          <p className="mt-2 text-3xl font-bold">{stats.projects}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Clients</h3>
          <p className="mt-2 text-3xl font-bold">{stats.clients}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Contacts</h3>
          <p className="mt-2 text-3xl font-bold">{stats.contacts}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Subscribers</h3>
          <p className="mt-2 text-3xl font-bold">{stats.subscribers}</p>
        </div>
      </div>
    </div>
  )
}
