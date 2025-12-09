export function About() {
  return (
    <section className="border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex items-center">
            <img src="/about-section-illustration.jpg" alt="About" className="w-full rounded-lg object-cover" />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h2>
            <p className="text-lg text-muted-foreground">
              We are a team of passionate professionals dedicated to creating innovative digital solutions. With years
              of experience across various industries, we understand what it takes to succeed in today's competitive
              market.
            </p>
            <p className="text-lg text-muted-foreground">
              Our mission is to empower businesses with technology that drives growth and creates meaningful connections
              with their audience. We believe in delivering excellence in every project we undertake.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">30+</div>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
