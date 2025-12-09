"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-dashed border-primary/20 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary font-hand tracking-wide">
            Prismy
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-hand text-lg">
              Admin
            </Link>
            <Button size="sm" asChild className="font-hand text-lg">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
