"use client"

import { ContactForm } from "./contact-form"

export function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Transform Your Vision Into Reality
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                We create exceptional digital experiences that drive growth and engage your audience
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <ContactForm hero />
          </div>
        </div>
      </div>
    </section>
  )
}
