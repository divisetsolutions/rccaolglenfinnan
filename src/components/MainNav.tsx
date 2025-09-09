import Link from "next/link";
import Image from "next/image";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src="/logo.png" alt="Parish Logo" width={40} height={40} />
        <span className="font-bold">Caol & Glenfinnan</span>
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
