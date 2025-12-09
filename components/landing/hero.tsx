"use client"

import { ContactForm } from "./contact-form"
import { PaperContainer } from "@/components/ui/paper-container"
import { DoodleArrow, DoodleStar } from "@/components/ui/icons"

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Animated gradient blob background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Animated background doodles */}
      <div className="absolute inset-0 pointer-events-none">
        <DoodleStar className="absolute top-24 left-10 w-12 h-12 text-primary/30 rotate-12 animate-float" />
        <DoodleStar className="absolute top-40 right-32 w-8 h-8 text-accent/40 -rotate-12 animate-float-delayed" />
        <DoodleStar className="absolute bottom-32 right-20 w-16 h-16 text-accent/30 animate-float-slow" />
        <DoodleStar className="absolute bottom-48 left-24 w-10 h-10 text-primary/25 rotate-45 animate-bounce" />
        <DoodleArrow className="absolute top-1/3 right-1/4 w-32 h-16 text-primary/20 rotate-45 animate-wiggle" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3 relative">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-primary drop-shadow-sm animate-fade-in-up">
                Transform Your <span className="text-accent underline decoration-wavy decoration-2 underline-offset-4">Vision</span> Into Reality
              </h1>
              <p className="text-xl text-muted-foreground sm:text-2xl font-hand animate-fade-in-up-delayed">
                We create exceptional digital experiences that drive growth and engage your audience.
              </p>
              <DoodleArrow className="absolute -bottom-12 right-0 w-24 h-12 text-primary/40 rotate-12 hidden lg:block animate-draw" />
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end animate-scale-in">
            <PaperContainer variant="notebook" rotate="right" decoration="tape" className="w-full max-w-md hover-tilt">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-primary">Get a Free Consultation</h3>
                <p className="text-muted-foreground">Let's start your journey today.</p>
              </div>
              <ContactForm hero />
            </PaperContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
