import Link from "next/link";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-base font-medium transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Home
      </Link>
      <Link href="/about" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        About Us
      </Link>
      <Link href="/news" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        News & Events
      </Link>
      <Link href="/newsletters" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Newsletters
      </Link>
      <Link href="/gallery" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Gallery
      </Link>
      <Link href="/calendar" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Calendar
      </Link>
      <Link href="/sacraments" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Sacraments
      </Link>
      <Link href="/contact" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Contact
      </Link>
    </nav>
  );
}
