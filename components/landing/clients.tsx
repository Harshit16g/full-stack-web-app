import { ClientsList } from "./clients-list"
import { PaperContainer } from "@/components/ui/paper-container"
import { PaperClip } from "@/components/ui/icons"
import { AnimatedSection } from "@/components/ui/animated-section"

export async function Clients() {
  return (
    <section className="border-t border-dashed border-primary/20 bg-muted/30 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A2B3C 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="mb-12 text-center relative">
          <PaperContainer variant="default" className="inline-block relative rotate-1 bg-card/80 backdrop-blur-sm animate-wiggle">
            <PaperClip className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 text-muted-foreground" />
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-hand text-primary px-8 py-2">Happy Clients</h2>
          </PaperContainer>
          <p className="mt-6 text-xl text-muted-foreground font-hand">What our clients say about us</p>
        </AnimatedSection>
        <ClientsList />
      </div>
    </section>
  )
}
