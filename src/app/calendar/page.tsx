import type { Metadata } from 'next';
import Link from 'next/link';
import { AwayNotice, PageHeader, Section, SectionHeading } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { WeekAhead } from '@/components/site/WeekAhead';
import { CHURCHES, PARISH } from '@/lib/content';
import { getSchedule } from '@/lib/data';
import { formatMinutes, weeklyPattern } from '@/lib/schedule';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Mass times',
  description: 'Mass, confession and adoration times at St John the Evangelist, Caol (Fort William) and St Mary & St Finnan, Glenfinnan, with this week’s changes.',
  alternates: { canonical: '/calendar' },
};

export default async function MassTimesPage() {
  const schedule = await getSchedule();

  return (
    <>
      <PageHeader
        title="Mass times"
        lede="The next two weeks as they will really happen, followed by the usual weekly pattern at each church."
        image="/img/caol-altar.jpg"
        imageAlt="Candles lit around the altar at St John’s, Caol"
      />

      <Section tone="mist">
        <SectionHeading title="The next fourteen days" lede="Funerals, feast days and any weeks without weekday Mass are already included." />
        <AwayNotice className="mb-6" />
        <WeekAhead items={schedule} days={14} />
      </Section>

      <Section tone="white">
        <SectionHeading title="A usual week" lede="When nothing out of the ordinary is happening, this is the pattern." />
        <div className="grid gap-8 md:grid-cols-2">
          {Object.values(CHURCHES).map((c, i) => {
            const pattern = weeklyPattern(schedule, c.id);
            return (
              <Reveal key={c.id} delay={i * 120} className="rounded-[2rem] bg-mist p-7 md:p-10">
                <h3 className="display-md">{c.name}</h3>
                <p className="mt-1 text-slate">{c.place}</p>
                {pattern.length === 0 ? (
                  <p className="mt-6 text-slate">Times will be posted here shortly. Please ring {PARISH.phone}.</p>
                ) : (
                  <dl className="mt-6 divide-y-2 divide-line">
                    {pattern.map((day) => (
                      <div key={day.weekday} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                        <dt className="font-display text-[1.3rem] font-semibold">{day.weekday}</dt>
                        <dd className="space-y-2">
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
                <Link href={c.slug} className="link mt-6 inline-block">
                  Directions to {c.short}
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 rounded-[2rem] bg-heather-soft p-7 md:p-10">
          <h3 className="display-md text-heather">Need a priest urgently?</h3>
          <p className="mt-3 max-w-[60ch]">
            For someone who is dying or seriously ill, ring the parish at any hour on{' '}
            <a className="link" href={PARISH.phoneHref}>
              {PARISH.phone}
            </a>
            . Confession is also available at any reasonable time by arrangement.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
