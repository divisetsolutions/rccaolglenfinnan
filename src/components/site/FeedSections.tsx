/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { focus } from '@/lib/content';
import { SectionHeading } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import type { FeedItem } from '@/lib/feeds';

/** Our own photos when a story has none, so every card has a picture. These are section pictures, not photos of the story. */
export const FALLBACK = { parish: '/img/glenfinnan-prayer.jpg', diocese: '/img/glenfinnan-autumn.jpg', scotland: '/img/loch.jpg' };

function CardPicture({ src, sizes }: { src: string; sizes: string }) {
  return (
    <span className="relative block aspect-[16/9] overflow-hidden bg-mist-2">
      {src.startsWith('/') ? (
        <Image src={src} alt="" fill sizes={sizes} style={focus(src)} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      )}
    </span>
  );
}

const day = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'Europe/London' });

/** Photo cards for news from another site. Each opens in a new tab, so our page stays open behind it. */
function FeedCards({ title, lede, source, items, fallback }: { title: string; lede: string; source: string; items: FeedItem[]; fallback?: string }) {
  if (items.length === 0) return null;
  const grid = items.length === 1 ? '' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div>
      <SectionHeading title={title} lede={lede} />
      <ul className={`grid gap-6 ${grid}`}>
        {items.map((n, i) => (
          <Reveal as="li" key={n.link} delay={(i % 3) * 100}>
            <a href={n.link} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {(n.image || fallback) && <CardPicture src={(n.image || fallback) as string} sizes="(max-width: 768px) 100vw, 600px" />}
              <span className="flex flex-grow flex-col p-6">
                <span className="text-[0.95rem] text-slate">{day(n.date)}</span>
                <span className="mt-1 block font-display text-[1.4rem] font-semibold leading-snug group-hover:text-heather">{n.title}</span>
                {n.summary && <span className="mt-2 line-clamp-3 text-slate">{n.summary}</span>}
                <span className="mt-4 text-[0.95rem] font-bold text-heather">Read on {source}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** The Pope's latest news from Vatican News. */
export function FromRome({ items }: { items: FeedItem[] }) {
  return <FeedCards title="From Rome" lede="The latest news of Pope Leo XIV from Vatican News." source="Vatican News" items={items} />;
}

/** The latest story from the Bishops' Conference of Scotland. */
export function FromScotland({ items }: { items: FeedItem[] }) {
  return <FeedCards title="From Scotland" lede="The latest from the Bishops’ Conference of Scotland." source="the Bishops’ Conference" items={items} fallback={FALLBACK.scotland} />;
}

/** New items from the diocese website, shown only while they are less than two weeks old. */
export function FromTheDiocese({ items }: { items: FeedItem[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <SectionHeading title="From the diocese" lede="New from the Diocese of Argyll and the Isles." />
      <ul>
        {items.map((n) => (
          <li key={n.link}>
            <a href={n.link} target="_blank" rel="noopener noreferrer" className="group grid gap-2 border-t-2 border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8">
              <span className="text-slate">
                {day(n.date)}
                {n.kind && <span className="block text-[0.92rem]">{n.kind}</span>}
              </span>
              <span>
                <span className="block font-display text-[1.55rem] font-semibold leading-snug group-hover:text-heather">{n.title}</span>
                {n.summary && <span className="mt-1 block max-w-[70ch] text-slate">{n.summary}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const cardClass = 'group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft';
function Card({ href, internal, children }: { href: string; internal?: boolean; children: React.ReactNode }) {
  return internal ? (
    <Link href={href} className={cardClass}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
      {children}
    </a>
  );
}

export interface NewsCard {
  label: string;
  item: FeedItem;
  /** Our own page (opens here) or another site (opens in a new tab). */
  internal?: boolean;
}

/** Homepage "Church News": one story each from the parish, the diocese, Scotland and Rome. Empty ones are left out. */
export function ChurchNews({ cards }: { cards: NewsCard[] }) {
  if (cards.length === 0) return null;
  const cols = cards.length >= 4 ? 'lg:grid-cols-4' : cards.length === 3 ? 'lg:grid-cols-3' : '';
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h2 className="display-md">Church News</h2>
        <Link href="/news" className="link">
          All news
        </Link>
      </div>
      <ul className={`mt-6 grid gap-6 md:grid-cols-2 ${cols}`}>
        {cards.map(({ label, item, internal }, i) => (
          <Reveal as="li" key={label} delay={i * 90}>
            <Card href={item.link} internal={internal}>
              {item.image && <CardPicture src={item.image} sizes="(max-width: 768px) 100vw, 300px" />}
              <span className="flex flex-grow flex-col p-6">
              <span className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-heather">{label}</span>
              <span className="mt-1 text-[0.92rem] text-slate">{day(item.date)}</span>
              <span className="mt-2 block font-display text-[1.35rem] font-semibold leading-snug group-hover:text-heather">{item.title}</span>
              <span className="mt-2 flex-grow">{item.summary && <span className="line-clamp-3 text-[0.98rem] text-slate">{item.summary}</span>}</span>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
