import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MainNav() {
  return (
    <nav className="flex items-center flex-wrap gap-4 lg:gap-6 justify-end">
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
      <Link href="/prayer-requests" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Prayer Requests
      </Link>
      <a href="https://universalis.com/europe.scotland.argyll/today.htm" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Today's Liturgy
      </a>
      <Link href="/contact" className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block">
        Contact
      </Link>
      <Button asChild>
        <Link href="/donations">Donate</Link>
      </Button>
    </nav>
  );
}