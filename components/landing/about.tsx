import Image from "next/image"
import { PaperContainer } from "@/components/ui/paper-container"
import { PaperClip } from "@/components/ui/icons"

export function About() {
  return (
    <section className="border-t border-dashed border-primary/20 bg-muted/30 py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex items-center justify-center">
            <PaperContainer variant="polaroid" rotate="left" className="max-w-md w-full">
              <Image src="/about-section-illustration.jpg" alt="About" width={500} height={300} className="w-full aspect-video bg-gray-100 object-cover" />
              <div className="mt-4 text-center font-hand text-xl text-primary">Our Creative Team</div>
            </PaperContainer>
          </div>
          <div className="flex flex-col justify-center">
            <PaperContainer variant="default" decoration="clip" rotate="right">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">About Us</h2>
                <p className="text-lg text-muted-foreground">
                  We are a team of passionate professionals dedicated to creating innovative digital solutions. With years
                  of experience across various industries, we understand what it takes to succeed in today's competitive
                  market.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our mission is to empower businesses with technology that drives growth and creates meaningful connections
                  with their audience. We believe in delivering excellence in every project we undertake.
                </p>
                <div className="flex gap-8 pt-4 border-t border-dashed border-primary/20 mt-4">
                  <div>
                    <div className="text-3xl font-bold text-primary font-hand">50+</div>
                    <p className="text-sm text-muted-foreground">Projects Delivered</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary font-hand">30+</div>
                    <p className="text-sm text-muted-foreground">Happy Clients</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary font-hand">5+</div>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </PaperContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
