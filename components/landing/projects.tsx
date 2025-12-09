import { ProjectsList } from "./projects-list"

export async function Projects() {
  return (
    <section className="border-t py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">Showcasing our latest work and achievements</p>
        </div>
        <ProjectsList />
      </div>
    </section>
  )
}
