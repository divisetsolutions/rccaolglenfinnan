"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/news", label: "News & Events" },
    { href: "/newsletters", label: "Newsletters" },
    { href: "/gallery", label: "Gallery" },
    { href: "/calendar", label: "Calendar" },
    { href: "/sacraments", label: "Sacraments" },
    { href: "/prayer-requests", label: "Prayer Requests" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center flex-wrap gap-4 lg:gap-6 justify-start">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "text-base font-medium transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block",
            isActive(item.href) ? "" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
      <a
        href="https://universalis.com/europe.scotland.argyll/today.htm"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium text-muted-foreground transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block"
      >
        Liturgy of the Day
      </a>
      <Link
        href="/contact"
        className={cn(
          "text-base font-medium transition-transform transition-colors duration-200 hover:text-primary hover:scale-105 inline-block",
          isActive("/contact") ? "" : "text-muted-foreground"
        )}
      >
        Contact
      </Link>
      <Button asChild>
        <Link href="/donations">Donate</Link>
      </Button>
    </nav>
  );
}