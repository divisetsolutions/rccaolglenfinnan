import Link from "next/link";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Home
      </Link>
      <Link href="/news" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        News & Events
      </Link>
      <Link href="/newsletters" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Newsletters
      </Link>
      <Link href="/sacraments" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Sacraments
      </Link>
      <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Contact
      </Link>
    </nav>
  );
}
