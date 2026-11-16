'use client';

import { useEffect, useState } from 'react';
import { PARISH } from '@/lib/content';
import { SEASON_LABEL, seasonOf, type Season } from '@/lib/liturgy';
import { formatDate, londonNow } from '@/lib/schedule';

/** Today's date and liturgical season, tinted with the season's colour. */
export function SeasonTag() {
  const [info, setInfo] = useState<{ season: Season; date: string } | null>(null);

  useEffect(() => {
    const { date } = londonNow();
    const season = seasonOf(date);
    document.documentElement.dataset.season = season;
    setInfo({ season, date });
  }, []);

  return (
    <a
      href={PARISH.liturgyToday}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[44px] items-center gap-3 rounded-full bg-white px-4 py-2 text-[0.98rem] shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <span className="h-3.5 w-3.5 rounded-full bg-season" aria-hidden />
      {info ? (
        <span>
          <strong>{formatDate(info.date)}</strong>, {SEASON_LABEL[info.season]}. <span className="underline decoration-gorse decoration-2 underline-offset-4">Today’s readings</span>
        </span>
      ) : (
        <span>Today’s readings</span>
      )}
    </a>
  );
}
