import { ContactForm } from "./contact-form"
import { PaperContainer } from "@/components/ui/paper-container"
import { DoodleArrow, ScribbleHighlight } from "@/components/ui/icons"

export function Contact() {
  return (
    <section id="contact" className="border-t border-dashed border-primary/20 py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center relative">
          <div className="inline-block relative">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary font-hand relative z-10">
              Ready for a new project?
            </h2>
            <ScribbleHighlight className="absolute bottom-1 left-0 w-full h-4 -z-0 opacity-50" />
          </div>
          <p className="mt-6 text-xl text-muted-foreground font-hand max-w-2xl mx-auto">
            We would love to hear from you. Send us a message today and let's build something amazing together.
          </p>
          <DoodleArrow className="absolute -bottom-8 right-1/4 w-24 h-12 text-accent rotate-12 hidden md:block" />
        </div>

        <div className="relative">
          <PaperContainer variant="notebook" decoration="tape" rotate="left" className="max-w-xl mx-auto">
            <div className="absolute -right-12 top-0 hidden lg:block rotate-12">
              <div className="bg-accent text-primary font-hand font-bold p-4 shadow-lg transform rotate-3 rounded-sm border-2 border-primary/20">
                Let's Talk!
              </div>
            </div>
            <ContactForm />
          </PaperContainer>
        </div>
      </div>
    </section>
  )
}
