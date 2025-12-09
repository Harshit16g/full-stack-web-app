import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { About } from "@/components/landing/about"
import { Projects } from "@/components/landing/projects"
import { Clients } from "@/components/landing/clients"
import { Contact } from "@/components/landing/contact"
import { Newsletter } from "@/components/landing/newsletter"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <About />
      <Projects />
      <Clients />
      <Contact />
      <Newsletter />
      <Footer />
    </main>
  )
}
