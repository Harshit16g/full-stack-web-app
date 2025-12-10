import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-dashed border-primary/20 bg-muted/50 py-12 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold font-hand text-2xl text-primary">About</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We create exceptional digital experiences that drive growth.
            </p>
          </div>
          <div>
            <h3 className="font-bold font-hand text-2xl text-primary">Links</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors font-hand text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-primary transition-colors font-hand text-lg">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-hand text-2xl text-primary">Contact</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Email: lodhi.ji.16@gmail.com
              <br />
              Phone: +91 8770XXXX87
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-dashed border-primary/20 pt-8 text-center text-sm text-muted-foreground font-hand text-lg">
          <p>&copy; 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
