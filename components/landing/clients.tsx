import { ClientsList } from "./clients-list"

export async function Clients() {
  return (
    <section className="border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Happy Clients</h2>
          <p className="mt-4 text-lg text-muted-foreground">What our clients say about us</p>
        </div>
        <ClientsList />
      </div>
    </section>
  )
}
