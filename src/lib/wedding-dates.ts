/**
 * Booked wedding dates for the public /weddings page.
 *
 * Source: the private Google Calendar "Parish Calendar, Caol and Glenfinnan",
 * read through its secret iCal address in the env var WEDDING_CALENDAR_ICS.
 * That address is a secret: never put it in code (the repo is public).
 *
 * Only these facts leave the calendar: date, time, church and status.
 * Names, home countries, towns, celebrants and notes are never shown
 * (countries removed 21 Nov 2026 at Fr Charles's request, for privacy).
 * Events whose title does not start with "Wedding", and any marked
 * "Status: Undated", are left out.
 */

export type WeddingDate = {
  start: number; // ms since epoch
  allDay: boolean;
  church: string;
  status: 'Booked' | 'Provisional';
};

const ZONE = 'Europe/London';

/** Undo iCal line folding and split into lines. */
function unfold(ics: string): string[] {
  return ics.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '').split(/\r?\n/);
}

function unescape(v: string): string {
  return v
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

/** Offset (ms) of a time zone at a given UTC instant. */
function zoneOffset(utc: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utc));
  const n = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return Date.UTC(n('year'), n('month') - 1, n('day'), n('hour'), n('minute'), n('second')) - utc;
}

/** Parse a DTSTART line (params + value). */
function parseStart(params: string, value: string): { start: number; allDay: boolean } | null {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s, z] = m;
  if (h === undefined || /VALUE=DATE(?!-)/i.test(params)) {
    return { start: Date.UTC(+y, +mo - 1, +d), allDay: true };
  }
  const wall = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s);
  if (z) return { start: wall, allDay: false };
  const tz = params.match(/TZID=([^;:]+)/i)?.[1] ?? ZONE;
  // Two passes handle the hour around a clock change.
  let utc = wall - zoneOffset(wall, tz);
  utc = wall - zoneOffset(utc, tz);
  return { start: utc, allDay: false };
}

export function parseWeddingIcs(ics: string, now = Date.now()): WeddingDate[] {
  const out: WeddingDate[] = [];
  let ev: Record<string, { params: string; value: string }> | null = null;

  for (const line of unfold(ics)) {
    if (line === 'BEGIN:VEVENT') {
      ev = {};
      continue;
    }
    if (line === 'END:VEVENT') {
      if (ev) {
        const w = toWedding(ev, now);
        if (w) out.push(w);
      }
      ev = null;
      continue;
    }
    if (!ev) continue;
    const m = line.match(/^([A-Z-]+)((?:;[^:]*)?):(.*)$/);
    if (m && !ev[m[1]]) ev[m[1]] = { params: m[2], value: m[3] };
  }

  return out.sort((a, b) => a.start - b.start);
}

function toWedding(ev: Record<string, { params: string; value: string }>, now: number): WeddingDate | null {
  const summary = unescape(ev.SUMMARY?.value ?? '');
  if (!/^Wedding\b/i.test(summary)) return null;
  if (/^CANCELLED$/i.test(ev.STATUS?.value ?? '')) return null;

  const desc = unescape(ev.DESCRIPTION?.value ?? '');
  const statusText = desc.match(/^Status:\s*(\w+)/im)?.[1]?.toLowerCase();
  if (statusText === 'undated') return null;
  const status: WeddingDate['status'] =
    statusText === 'provisional' || /provisional/i.test(summary) ? 'Provisional' : 'Booked';

  const s = ev.DTSTART && parseStart(ev.DTSTART.params, ev.DTSTART.value);
  if (!s) return null;
  // Keep a wedding on the list until the end of its day.
  if (s.start + 86400000 < now) return null;

  const location = unescape(ev.LOCATION?.value ?? '');
  const church = /caol|st john/i.test(location) ? 'St John’s, Caol' : 'St Mary & St Finnan, Glenfinnan';

  return { start: s.start, allDay: s.allDay, church, status };
}

/** Fetch and parse the calendar. Returns [] if the address is missing or the fetch fails. */
export async function getWeddingDates(): Promise<WeddingDate[]> {
  const url = process.env.WEDDING_CALENDAR_ICS;
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return parseWeddingIcs(await res.text());
  } catch {
    return [];
  }
}

export function weddingDay(w: WeddingDate): string {
  return new Date(w.start).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: w.allDay ? 'UTC' : ZONE,
  });
}

