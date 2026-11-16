'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Newsletter {
  id: string;
  downloadUrl?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

interface Homily {
  id: string;
  slug?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

interface InfoCardsProps {
  latestNewsletter: Newsletter | null;
  latestHomily: Homily | null;
}

export function InfoCards({ latestNewsletter, latestHomily }: InfoCardsProps) {
  const items = [
    {
      image: '/st-johns-main.jpg',
      title: 'Mass & Service Times',
      description:
        'The full weekly schedule for both churches, including weekday Masses, devotions and Holy Days.',
      href: '/calendar',
      cta: 'View the calendar',
    },
    {
      image: '/parish-mission-community.jpg',
      title: 'News & Events',
      description:
        'Announcements from the parish, the Diocese of Argyll and the Isles, and the wider Church.',
      href: '/news',
      cta: 'Read the latest',
    },
    {
      image: '/st-marys-main.jpg',
      title: 'Weekly Newsletter',
      description:
        'Sunday bulletins gathering Mass intentions, prayer requests and parish notices.',
      href: '/newsletters',
      cta: 'Download the newsletter',
      footer:
        latestNewsletter && latestNewsletter.downloadUrl ? (
          <a
            href={latestNewsletter.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block mt-3 font-serif italic text-sm text-stone hover:text-gold"
          >
            Latest: {latestNewsletter.title}
          </a>
        ) : null,
    },
    {
      image: '/parish-priest.jpg',
      title: 'Sunday Homily',
      description:
        'Reflections preached at St John the Evangelist and St Mary & St Finnan each Lord’s Day.',
      href: '/homilies',
      cta: 'Read the homilies',
      footer:
        latestHomily && latestHomily.slug ? (
          <Link
            href={`/homilies/${latestHomily.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="block mt-3 font-serif italic text-sm text-stone hover:text-gold"
          >
            Latest: {latestHomily.title}
          </Link>
        ) : null,
    },
  ];

  return (
    <section className="bg-ivory-soft py-[72px] md:py-[108px] border-b border-gold/25">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9">
          <h2 className="font-display text-navy text-[clamp(2rem,4.2vw,3.4rem)] tracking-[-0.015em] leading-[1.05]">
            Where to begin.
          </h2>
          <p className="font-serif italic text-stone max-w-md text-[1.05rem] leading-snug">
            Four ways into the life of the parish, for visitors and for those who pray with us each
            week.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-9">
          {items.map((item) => (
            <li key={item.title} className="group">
              <Link href={item.href} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-gold/30">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-5 font-display text-navy text-[1.4rem] leading-[1.15] group-hover:text-oxblood transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 font-serif text-ink/85 text-[1rem] leading-[1.6]">
                  {item.description}
                </p>
                {item.footer}
                <div className="mt-4">
                  <span className="smallcaps text-navy nav-link" data-active="false">
                    {item.cta} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
