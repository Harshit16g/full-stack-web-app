import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Expert Team",
    description: "Experienced professionals with proven track record in delivering quality solutions",
  },
  {
    title: "Custom Solutions",
    description: "Tailored approaches designed specifically for your business needs",
  },
  {
    title: "On-Time Delivery",
    description: "Committed to meeting deadlines without compromising on quality",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team available whenever you need assistance",
  },
]

export function WhyChooseUs() {
  return (
    <section className="border-t bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">Here is what makes us different</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
