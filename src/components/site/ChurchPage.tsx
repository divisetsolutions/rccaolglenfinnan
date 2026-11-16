import Image from 'next/image';
import Link from 'next/link';
import { PageHeader, Section, SectionHeading } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import type { Church } from '@/lib/content';
import { getSchedule } from '@/lib/data';
import { formatMinutes, weeklyPattern } from '@/lib/schedule';

export async function ChurchPage({ church }: { church: Church }) {
  const pattern = weeklyPattern(await getSchedule(), church.id);

  return (
    <>
      <PageHeader title={church.name} lede={`${church.place}. ${church.summary}`} image={church.hero} imageAlt={`${church.name}, ${church.place}`}>
        <a href={church.map} target="_blank" rel="noopener noreferrer" className="btn btn-gorse">
          Open in Google Maps
        </a>
        <Link href="/calendar" className="btn btn-ghost-light">
          This week’s times
        </Link>
      </PageHeader>

      <Section tone="white">
        <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <Reveal>
            <h2 className="display-lg">{church.setting}</h2>
            <div className="mt-6 max-w-[62ch] space-y-5 text-[1.12rem] leading-[1.75]">
              {church.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="self-start rounded-[2rem] bg-loch p-7 text-mist md:sticky md:top-28 md:p-9">
            <h2 className="display-md">Services here</h2>
            {pattern.length === 0 ? (
              <p className="mt-4 text-mist/75">Times will be posted shortly.</p>
            ) : (
              <dl className="mt-5 divide-y divide-mist/15">
                {pattern.map((day) => (
                  <div key={day.weekday} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                    <dt className="font-bold text-gorse">{day.weekday}</dt>
                    <dd className="space-y-1">
                      {day.entries.map((e) => (
                        <p key={e.id}>
                          <span className="font-bold tabular-nums">{formatMinutes(e.minutes)}</span> {e.title}
                        </p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-5 text-[0.95rem] text-mist/70">This is the usual pattern. Check this week’s times before you travel.</p>
            <address className="mt-6 border-t border-mist/15 pt-5 not-italic">
              {church.address.join(', ')}
              <br />
              <a className="underline decoration-gorse underline-offset-4" href={`mailto:${church.email}`}>
                {church.email}
              </a>
            </address>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Inside the church" />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {church.gallery.map((g, i) => (
            <Reveal image key={g.src} delay={(i % 3) * 100} className="mb-5 break-inside-avoid overflow-hidden rounded-3xl">
              <Image src={g.src} alt={g.alt} width={900} height={i % 2 ? 1100 : 620} sizes="(max-width: 640px) 100vw, 400px" className={`w-full object-cover ${i % 2 ? 'aspect-[4/5]' : 'aspect-[3/2]'}`} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="heather">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="display-lg text-heather">Finding us</h2>
            <ul className="mt-6 space-y-4 text-[1.1rem]">
              {church.visiting.map((v) => (
                <li key={v} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-heather" />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <iframe
              title={`Map showing ${church.name}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${church.lng - 0.03}%2C${church.lat - 0.012}%2C${church.lng + 0.03}%2C${church.lat + 0.012}&layer=mapnik&marker=${church.lat}%2C${church.lng}`}
              className="h-[340px] w-full border-0"
              loading="lazy"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
