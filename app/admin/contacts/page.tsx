import { ContactsList } from "@/components/admin/contacts/contacts-list"

export default function ContactsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Contact Requests</h1>
        <p className="text-muted-foreground">View all contact form submissions</p>
      </div>
      <ContactsList />
    </div>
  )
}
