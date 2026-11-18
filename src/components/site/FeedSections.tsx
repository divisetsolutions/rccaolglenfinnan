/* eslint-disable @next/next/no-img-element */
import { SectionHeading } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import type { FeedItem } from '@/lib/feeds';

const day = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'Europe/London' });

/** The Pope's latest news as photo cards. Each opens Vatican News in a new tab, so our page stays open. */
export function FromRome({ items }: { items: FeedItem[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <SectionHeading title="From Rome" lede="The latest news of Pope Leo XIV from Vatican News, updated through the day." />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n, i) => (
          <Reveal as="li" key={n.link} delay={(i % 3) * 100}>
            <a href={n.link} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft">
              {n.image && (
                <span className="block aspect-[16/9] overflow-hidden bg-mist-2">
                  <img src={n.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
              )}
              <span className="flex flex-grow flex-col p-6">
                <span className="text-[0.95rem] text-slate">{day(n.date)}</span>
                <span className="mt-1 block font-display text-[1.4rem] font-semibold leading-snug group-hover:text-heather">{n.title}</span>
                <span className="mt-2 line-clamp-3 text-slate">{n.summary}</span>
                <span className="mt-4 text-[0.95rem] font-bold text-heather">Read on Vatican News</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
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
