// The liturgical season for a given date (Roman calendar, as kept in Scotland).
// Seasons only: feast days and weekday colours are left to the Universalis link.

export type Season = 'advent' | 'christmas' | 'lent' | 'easter' | 'ordinary';

const utc = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);
const DAY = 86400000;

/** Easter Sunday by the Gregorian computus. */
export function easter(year: number): number {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(year, month, day);
}

/** First Sunday of Advent: the fourth Sunday before Christmas Day. */
export function adventStart(year: number): number {
  const christmas = utc(year, 12, 25);
  const dow = new Date(christmas).getUTCDay();
  const sundayBefore = christmas - (dow === 0 ? 7 : dow) * DAY;
  return sundayBefore - 21 * DAY;
}

/** Baptism of the Lord: the Sunday after 6 January (Epiphany is kept on 6 January in Scotland). */
function baptismOfTheLord(year: number): number {
  const epiphany = utc(year, 1, 6);
  const dow = new Date(epiphany).getUTCDay();
  return epiphany + (7 - dow) * DAY;
}

export function seasonOf(dateStr: string): Season {
  const [y, m, d] = dateStr.split('-').map(Number);
  const t = utc(y, m, d);
  if (t >= utc(y, 12, 25) || t <= baptismOfTheLord(y)) return 'christmas';
  if (t >= adventStart(y)) return 'advent';
  const e = easter(y);
  const ashWednesday = e - 46 * DAY;
  const pentecost = e + 49 * DAY;
  if (t >= ashWednesday && t < e) return 'lent';
  if (t >= e && t <= pentecost) return 'easter';
  return 'ordinary';
}

export const SEASON_LABEL: Record<Season, string> = {
  advent: 'Advent',
  christmas: 'Christmas season',
  lent: 'Lent',
  easter: 'Easter season',
  ordinary: 'Ordinary Time',
};
