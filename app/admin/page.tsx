import { getDashboardStats } from "@/app/actions/dashboard"
import { EngagementChart } from "@/components/admin/charts/engagement-chart"
import { CityDistributionChart } from "@/components/admin/charts/city-distribution-chart"
import { TrendCard } from "@/components/admin/charts/trend-card"
import { ConversionMetric } from "@/components/admin/charts/conversion-metric"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
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
      </section>

      {/* Analytics Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <EngagementChart data={stats.engagementsByDay} />
          <CityDistributionChart data={stats.contactsByCity} />
        </div>
      </section>

      {/* Insights Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Insights</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TrendCard
            title="Weekly Engagements"
            thisWeek={stats.weeklyTrend.thisWeek}
            lastWeek={stats.weeklyTrend.lastWeek}
            percentChange={stats.weeklyTrend.percentChange}
            isPositive={stats.weeklyTrend.isPositive}
          />
          <ConversionMetric
            conversionRate={stats.conversionRate}
            contacts={stats.contacts}
            subscribers={stats.subscribers}
          />
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Top City</h3>
            <p className="mt-2 text-3xl font-bold">
              {stats.contactsByCity[0]?.city || "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">
              {stats.contactsByCity[0]?.count || 0} contacts
            </p>
          </div>
        </div>
      </section>

      {/* Recent Engagements */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Engagements</h2>
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            {stats.recentEngagements && stats.recentEngagements.length > 0 ? (
              <div className="space-y-4">
                {stats.recentEngagements.map((engagement: any) => (
                  <div key={engagement.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{engagement.full_name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{engagement.message || "No message"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{new Date(engagement.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent engagements found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
