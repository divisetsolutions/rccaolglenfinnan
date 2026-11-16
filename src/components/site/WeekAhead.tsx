'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  CHURCH_NAME,
  buildAgenda,
  formatDate,
  formatMinutes,
  londonNow,
  nextService,
  relativeDay,
  type AgendaDay,
  type AgendaEntry,
  type ScheduleItem,
} from '@/lib/schedule';

/** The live answer to "when is Mass?": the next service, then the seven days ahead. */
export function WeekAhead({ items, days = 7, showNext = true }: { items: ScheduleItem[]; days?: number; showNext?: boolean }) {
  const [state, setState] = useState<{ today: string; agenda: AgendaDay[]; next: AgendaEntry | null } | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const { date } = londonNow(now);
      setState({ today: date, agenda: buildAgenda(items, date, days), next: nextService(items, now) });
    };
    compute();
    const timer = setInterval(compute, 60000);
    return () => clearInterval(timer);
  }, [items, days]);

  if (!state) {
    return <div className="h-[420px] animate-pulse rounded-[2rem] bg-mist-2" aria-busy="true" />;
  }

  const { today, agenda, next } = state;

  return (
    <div>
      {showNext && (
        <div className="relative overflow-hidden rounded-[2rem] bg-loch p-7 text-mist shadow-lift md:p-10">
          <div aria-hidden className="absolute -right-16 -top-24 h-72 w-56 rounded-t-full border-[18px] border-mist/5" />
          <p className="flex items-center gap-3 font-bold text-gorse">
            <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-gorse" />
            Next service
          </p>
          {next ? (
            <div className="mt-4 grid items-end gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-none">
                  {relativeDay(next.date, today)}, {formatMinutes(next.minutes)}
                </p>
                <p className="mt-3 text-[1.2rem] text-mist/85">
                  {next.title} at {CHURCH_NAME[next.parishId] ?? next.parishId}
                </p>
                <p className="mt-1 text-mist/60">{formatDate(next.date)}</p>
              </div>
              <Link href={`/${next.parishId}`} className="btn btn-gorse justify-self-start">
                How to find us
              </Link>
            </div>
          ) : (
            <p className="mt-4 font-display text-3xl">Service times will be posted here shortly.</p>
          )}
        </div>
      )}

      <ol className={`grid gap-3 ${showNext ? 'mt-6' : ''} sm:grid-cols-2 lg:grid-cols-4`}>
        {agenda.map((day) => {
          const isToday = day.date === today;
          return (
            <li
              key={day.date}
              className={`rounded-3xl border-2 p-5 ${isToday ? 'border-gorse bg-white shadow-soft' : 'border-transparent bg-white/70'}`}
            >
              <p className="flex items-baseline justify-between gap-2">
                <span className="font-display text-[1.45rem] font-semibold">{relativeDay(day.date, today)}</span>
                <span className="text-[0.92rem] text-slate">{formatDate(day.date, { day: 'numeric', month: 'short' })}</span>
              </p>
              {day.entries.length === 0 ? (
                <p className="mt-3 text-slate">No services today.</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {day.entries.map((e) => (
                    <li key={e.id} className={`border-l-4 pl-3 ${e.cancelled ? 'border-heather' : e.parishId === 'caol' ? 'border-pine' : 'border-loch'}`}>
                      {e.cancelled ? (
                        <p className="font-bold text-heather">{e.title}</p>
                      ) : (
                        <p>
                          <span className="font-bold tabular-nums">{formatMinutes(e.minutes)}</span> <span>{e.title}</span>
                        </p>
                      )}
                      <p className="text-[0.92rem] text-slate">{e.parishId === 'caol' ? 'Caol' : 'Glenfinnan'}</p>
                      {e.dated && e.notes && <p className="mt-1 text-[0.92rem] leading-snug text-slate">{e.notes}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        <li className="flex flex-col justify-between rounded-3xl bg-heather-soft p-5">
          <p className="font-display text-[1.45rem] font-semibold text-heather">Times can change</p>
          <p className="mt-2 text-[0.98rem] text-loch">Funerals, feast days and the priest’s absence all show here first.</p>
          <Link href="/calendar" className="link mt-4 self-start">
            Full Mass times
          </Link>
        </li>
      </ol>
    </div>
  );
}
