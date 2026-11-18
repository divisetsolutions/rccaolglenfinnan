// Structured data (schema.org) that tells Google and AI tools who we are and when Mass is.
// Every node has an @id so the pieces on different pages join up into one picture.

import { CHURCHES, PARISH } from '@/lib/content';
import { formatMinutes, weeklyPattern, type ScheduleItem } from '@/lib/schedule';

export const PARISH_ID = `${PARISH.url}/#parish`;
export const PRIEST_ID = `${PARISH.url}/#parish-priest`;
const WEBSITE_ID = `${PARISH.url}/#website`;
const churchId = (slug: string) => `${PARISH.url}${slug}#church`;

const DIOCESE = { '@type': 'Organization', name: 'Roman Catholic Diocese of Argyll and the Isles', url: 'https://www.rcdai.org.uk' };

/** Pages elsewhere that describe the same church (identity only; our times are the correct ones). */
const SAME_AS: Record<string, string[]> = {
  glenfinnan: ['https://www.scotlandschurchestrust.org.uk/church/st-mary-and-st-finnan-glenfinnan/'],
};

/** Services worth publishing: Mass, confession and adoration (not private visits to the sick). */
const isPublicService = (title: string) => /mass|reconciliation|confession|adoration/i.test(title);

/** The usual week at one church as public services, Sunday first. */
export function usualServices(schedule: ScheduleItem[], church: string) {
  return weeklyPattern(schedule, church).flatMap((day) =>
    day.entries.filter((e) => isPublicService(e.title)).map((e) => ({ weekday: day.weekday, minutes: e.minutes, title: e.title })),
  );
}

/** "10:00 am" style times of Sunday Mass at one church. */
export function sundayMassTimes(schedule: ScheduleItem[], church: string): string[] {
  return usualServices(schedule, church)
    .filter((s) => s.weekday === 'Sunday' && /mass/i.test(s.title))
    .map((s) => formatMinutes(s.minutes));
}

const hhmm = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}:00`;

function churchNode(c: (typeof CHURCHES)[keyof typeof CHURCHES], schedule?: ScheduleItem[]) {
  const node: Record<string, unknown> = {
    '@type': 'CatholicChurch',
    '@id': churchId(c.slug),
    name: `${c.name}, ${c.place}`,
    url: `${PARISH.url}${c.slug}`,
    image: `${PARISH.url}${c.hero}`,
    description: c.summary,
    telephone: '+441397719281',
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address[0],
      addressLocality: c.id === 'caol' ? 'Fort William' : 'Glenfinnan',
      addressRegion: 'Highland',
      postalCode: c.address[c.address.length - 1],
      addressCountry: 'GB',
    },
    geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
    hasMap: c.map,
    isAccessibleForFree: true,
    publicAccess: true,
    parentOrganization: { '@id': PARISH_ID },
  };
  if (SAME_AS[c.id]) node.sameAs = SAME_AS[c.id];
  if (schedule) {
    const services = usualServices(schedule, c.id);
    if (services.length) {
      node.event = services.map((s) => ({
        '@type': 'Event',
        name: `${s.title} at ${c.name}, ${c.place}`,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        location: { '@id': churchId(c.slug) },
        organizer: { '@id': PARISH_ID },
        eventSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          byDay: `https://schema.org/${s.weekday}`,
          startTime: hhmm(s.minutes),
          scheduleTimezone: 'Europe/London',
        },
      }));
    }
  }
  return node;
}

/** Site-wide: the parish, the website, the parish priest and both churches. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': PARISH_ID,
        name: PARISH.full,
        alternateName: ['Caol and Glenfinnan Parish', 'RC Parish of Caol and Glenfinnan'],
        url: PARISH.url,
        logo: `${PARISH.url}/img/crest.png`,
        telephone: '+441397719281',
        email: PARISH.email,
        parentOrganization: DIOCESE,
        member: { '@id': PRIEST_ID },
        subOrganization: Object.values(CHURCHES).map((c) => ({ '@id': churchId(c.slug) })),
      },
      {
        '@type': 'Person',
        '@id': PRIEST_ID,
        name: 'Fr Charles Egbon',
        honorificPrefix: 'Fr',
        honorificSuffix: 'MSP',
        jobTitle: 'Parish Priest',
        worksFor: { '@id': PARISH_ID },
      },
      { '@type': 'WebSite', '@id': WEBSITE_ID, url: PARISH.url, name: PARISH.full, inLanguage: 'en-GB', publisher: { '@id': PARISH_ID } },
      ...Object.values(CHURCHES).map((c) => churchNode(c)),
    ],
  };
}

/** Mass times page: both churches with their weekly services, and the common questions answered. */
export function massTimesGraph(schedule: ScheduleItem[]) {
  const caol = sundayMassTimes(schedule, 'caol');
  const glen = sundayMassTimes(schedule, 'glenfinnan');
  const faq: { q: string; a: string }[] = [];
  if (caol.length) {
    faq.push({
      q: 'What time is Sunday Mass at St John’s, Caol, Fort William?',
      a: `Sunday Mass at St John the Evangelist, St John’s Road, Caol, Fort William PH33 7PR is at ${caol.join(' and ')} every Sunday. Changes for feast days and funerals are shown on ${PARISH.url}/calendar.`,
    });
  }
  if (glen.length) {
    faq.push({
      q: 'What time is Mass at Glenfinnan church?',
      a: `Sunday Mass at St Mary & St Finnan, Glenfinnan PH37 4LT is at ${glen.join(' and ')} every Sunday. Changes are shown on ${PARISH.url}/calendar.`,
    });
  }
  faq.push({
    q: 'How do I contact the Catholic parish of Caol and Glenfinnan?',
    a: `Ring the parish on ${PARISH.phone} or email ${PARISH.email}. For someone who is dying or seriously ill, ring at any hour.`,
  });
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...Object.values(CHURCHES).map((c) => churchNode(c, schedule)),
      {
        '@type': 'FAQPage',
        '@id': `${PARISH.url}/calendar#faq`,
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
}

/** Plain text from article HTML, cut at a word boundary, for descriptions. */
export function plainSummary(html: string | undefined, max = 158): string {
  const text = (html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`;
}
