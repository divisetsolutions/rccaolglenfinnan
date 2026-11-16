'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, PARISH } from '@/lib/content';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (pathname.startsWith('/admin')) return null;

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gorse focus:px-5 focus:py-3 focus:font-bold focus:text-loch-deep">
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open ? 'bg-mist/95 shadow-soft backdrop-blur' : 'bg-mist'
        }`}
      >
        <div className="wrap flex items-center gap-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${PARISH.full}, home`}>
            <Image src="/img/crest.png" alt="" width={52} height={52} className="h-12 w-12 shrink-0 rounded-full md:h-[52px] md:w-[52px]" priority />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[1.28rem] font-semibold text-loch md:text-[1.45rem]">Caol &amp; Glenfinnan</span>
              <span className="block truncate text-[0.82rem] text-slate">Catholic parish, West Highlands</span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 xl:flex 2xl:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[0.93rem] font-bold transition-colors 2xl:px-3.5 2xl:text-[0.98rem] ${
                  active(item.href) ? 'bg-loch text-mist' : 'text-loch hover:bg-mist-2'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donations" className="btn btn-gorse ml-2 !py-2.5">
              Give
            </Link>
          </nav>

          <button
            type="button"
            className="ml-auto inline-flex h-12 items-center gap-2.5 rounded-full bg-loch px-5 font-bold text-mist xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-loch text-mist xl:hidden"
        >
          <nav aria-label="Main" className="wrap flex flex-col py-6">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? 'page' : undefined}
                className="fade-up flex items-baseline justify-between border-b border-mist/15 py-4 font-display text-[1.9rem]"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {item.label}
                {active(item.href) && <span className="h-2.5 w-2.5 rounded-full bg-gorse" />}
              </Link>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/donations" className="btn btn-gorse">
                Give to the parish
              </Link>
              <a href={PARISH.phoneHref} className="btn btn-ghost-light">
                Call {PARISH.phone}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
