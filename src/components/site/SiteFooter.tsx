'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CHURCHES, PARISH } from '@/lib/content';

const links = [
  { href: '/calendar', label: 'Mass times' },
  { href: '/sacraments', label: 'Sacraments' },
  { href: '/prayer-requests', label: 'Ask for prayers' },
  { href: '/donations', label: 'Give to the parish' },
  { href: '/what-remains', label: 'Fr Charles’s book' },
  { href: '/safeguarding', label: 'Safeguarding' },
  { href: '/privacy', label: 'Your privacy' },
  { href: '/contact', label: 'Contact us' },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-loch-deep text-mist">
      <div className="tartan" aria-hidden />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr_0.9fr]">
        <div>
          <Image src="/img/crest.png" alt="Parish crest" width={84} height={84} className="rounded-full" />
          <p className="mt-5 font-display text-[1.7rem] leading-tight">Two churches, one parish family.</p>
          <p className="mt-3 text-mist/70">{PARISH.diocese}</p>
        </div>

        {Object.values(CHURCHES).map((c) => (
          <address key={c.id} className="not-italic">
            <p className="font-display text-[1.35rem]">{c.name}</p>
            <p className="mt-1 text-gorse">{c.setting}</p>
            <p className="mt-4 text-mist/80">
              {c.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3">
              <a className="underline decoration-mist/40 underline-offset-4 hover:decoration-gorse" href={`mailto:${c.email}`}>
                {c.email}
              </a>
            </p>
            {c.id === 'caol' && (
              <p className="mt-1">
                <a className="underline decoration-mist/40 underline-offset-4 hover:decoration-gorse" href={PARISH.phoneHref}>
                  {PARISH.phone}
                </a>
              </p>
            )}
            <p className="mt-3">
              <Link className="font-bold text-gorse hover:underline" href={c.slug}>
                Visit {c.short}
              </Link>
            </p>
          </address>
        ))}

        <nav aria-label="Footer">
          <ul className="space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-mist/85 hover:text-gorse">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://www.rcdai.org.uk" target="_blank" rel="noopener noreferrer" className="text-mist/85 hover:text-gorse">
                Diocese website
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-mist/15">
        <div className="wrap flex flex-col gap-2 py-6 text-[0.9rem] text-mist/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Parish of Caol and Glenfinnan. A parish of the Roman Catholic Diocese of Argyll and the Isles, Scottish
            charity {PARISH.charity}.
          </p>
          <p>
            Website by{' '}
            <a href="https://divisetsolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gorse">
              Diviset Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
