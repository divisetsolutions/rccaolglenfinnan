"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/newsletters", label: "Newsletters" },
  { href: "/gallery", label: "Gallery" },
  { href: "/calendar", label: "Calendar" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/prayer-requests", label: "Prayer" },
];

export function MainNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="parish-nav flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          data-active={isActive(item.href)}
          className="nav-link smallcaps-nav"
        >
          {item.label}
        </Link>
      ))}
      <a
        href="https://universalis.com/europe.scotland.argyll/today.htm"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link smallcaps-nav"
      >
        Liturgy
      </a>
      <Link
        href="/contact"
        data-active={isActive("/contact")}
        className="nav-link smallcaps-nav"
      >
        Contact
      </Link>
      <Link href="/donations" className="nav-give smallcaps-nav">
        Give
      </Link>
    </nav>
  );
}
