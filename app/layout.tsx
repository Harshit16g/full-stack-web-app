import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - Transform Your Vision Into Reality",
  description:
    "We create exceptional digital experiences that drive growth and engage your audience. Explore our projects, clients, and services.",
  keywords: ["portfolio", "projects", "web development", "digital solutions"],
  openGraph: {
    title: "Portfolio - Transform Your Vision Into Reality",
    description: "We create exceptional digital experiences that drive growth and engage your audience.",
    type: "website",
  },
  generator: 'v0.app'
}

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.className} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
