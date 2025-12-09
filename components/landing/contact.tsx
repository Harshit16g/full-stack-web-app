import { ContactForm } from "./contact-form"

export function Contact() {
  return (
    <section id="contact" className="border-t py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">We would love to hear from you. Send us a message today.</p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
