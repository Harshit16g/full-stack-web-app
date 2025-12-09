import { SubscribersList } from "@/components/admin/subscribers/subscribers-list"

export default function SubscribersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
        <p className="text-muted-foreground">View all newsletter subscribers</p>
      </div>
      <SubscribersList />
    </div>
  )
}
