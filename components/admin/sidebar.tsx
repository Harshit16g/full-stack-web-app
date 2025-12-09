"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth"

const links = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Projects",
    href: "/admin/projects",
  },
  {
    name: "Clients",
    href: "/admin/clients",
  },
  {
    name: "Contacts",
    href: "/admin/contacts",
  },
  {
    name: "Subscribers",
    href: "/admin/subscribers",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <aside className="flex w-64 flex-col border-r bg-muted/30">
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          Prismy
        </Link>
      </div>
      <nav className="flex-1 space-y-2 px-3 py-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button variant={pathname === link.href ? "default" : "ghost"} className="w-full justify-start" asChild>
              <span>{link.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
