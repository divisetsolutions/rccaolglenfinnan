// Pure schedule logic shared by server and browser. No database access here.

export type ChurchId = 'caol' | 'glenfinnan';

export interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek?: string;
  time: string;
  parishId: ChurchId | string;
  type?: string;
  notes?: string;
  /** YYYY-MM-DD. When set, the entry happens on that date only. */
  specialDate?: string | null;
  /** When true, a dated entry replaces the usual services at that church that day. */
  replaces?: boolean;
}

export interface AgendaEntry extends ScheduleItem {
  date: string;
  minutes: number;
  cancelled: boolean;
  dated: boolean;
}

export interface AgendaDay {
  date: string;
  weekday: string;
  entries: AgendaEntry[];
}

export const CHURCH_NAME: Record<string, string> = {
  caol: 'St John’s, Caol',
  glenfinnan: 'St Mary & St Finnan, Glenfinnan',
};

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** "10:00 AM", "06:30 PM", "13:30" -> minutes after midnight */
export function parseTime(time: string): number {
  if (!time) return 0;
  const t = time.trim().toUpperCase();
  const pm = t.includes('PM');
  const am = t.includes('AM');
  const [h, m] = t.replace(/[AP]M/, '').trim().split(':').map((n) => parseInt(n, 10) || 0);
  let hours = h;
  if (pm && hours < 12) hours += 12;
  if (am && hours === 12) hours = 0;
  return hours * 60 + (m || 0);
}

/** minutes after midnight -> "10:00 am" */
export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export const formatTime = (time: string) => formatMinutes(parseTime(time));

/** Today's date and time in the parish's own timezone, whatever the visitor's device says. */
export function londonNow(now: Date = new Date()): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10),
  };
}

export function addDays(date: string, n: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export const weekdayOf = (date: string) => WEEKDAYS[new Date(`${date}T12:00:00Z`).getUTCDay()];

export function formatDate(date: string, opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }): string {
  return new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}

const isCancellation = (item: ScheduleItem) => item.type === 'cancellation' || /^no\b/i.test(item.title.trim());

const replacesUsual = (item: ScheduleItem) => item.replaces === true || isCancellation(item) || /\(no mass\)/i.test(item.title);

/** Everything happening on each of the next `days` days, with dated entries applied. */
export function buildAgenda(items: ScheduleItem[], start: string, days: number): AgendaDay[] {
  const out: AgendaDay[] = [];
  for (let i = 0; i < days; i++) {
    const date = addDays(start, i);
    const weekday = weekdayOf(date);
    const dated = items.filter((s) => s.specialDate === date);
    const replacedChurches = new Set(dated.filter(replacesUsual).map((s) => s.parishId));
    const regular = items.filter((s) => !s.specialDate && s.dayOfWeek === weekday && !replacedChurches.has(s.parishId));
    const entries = [...dated, ...regular]
      .map((s) => ({ ...s, date, minutes: parseTime(s.time), cancelled: isCancellation(s), dated: Boolean(s.specialDate) }))
      .sort((a, b) => a.minutes - b.minutes || a.parishId.localeCompare(b.parishId));
    out.push({ date, weekday, entries });
  }
  return out;
}

/** The next service that is actually happening, looking up to two weeks ahead. */
export function nextService(items: ScheduleItem[], now: Date = new Date()): AgendaEntry | null {
  const { date, minutes } = londonNow(now);
  for (const day of buildAgenda(items, date, 14)) {
    for (const entry of day.entries) {
      if (entry.cancelled) continue;
      if (day.date === date && entry.minutes <= minutes) continue;
      return entry;
    }
  }
  return null;
}

/** The regular weekly pattern for one church, Sunday first. */
export function weeklyPattern(items: ScheduleItem[], church: string) {
  return WEEKDAYS.map((weekday) => ({
    weekday,
    entries: items
      .filter((s) => !s.specialDate && s.parishId === church && s.dayOfWeek === weekday)
      .map((s) => ({ ...s, minutes: parseTime(s.time) }))
      .sort((a, b) => a.minutes - b.minutes),
  })).filter((d) => d.entries.length > 0);
}

export function relativeDay(date: string, today: string): string {
  if (date === today) return 'Today';
  if (date === addDays(today, 1)) return 'Tomorrow';
  return formatDate(date, { weekday: 'long' });
}
