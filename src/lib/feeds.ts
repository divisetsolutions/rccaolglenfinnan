// News that updates itself: the Pope's news from Vatican News, and new items from the diocese.
// Read on the server, cached for an hour. Every function fails soft: a problem hides the section.

export interface FeedItem {
  title: string;
  summary: string;
  link: string;
  date: string; // ISO
  image?: string;
  kind?: string;
}

const HOUR = 3600;
/** Fr Charles's rule: nothing older than two weeks is shown. */
const MAX_AGE_DAYS = 14;

const fresh = (iso: string) => Date.now() - new Date(iso).getTime() <= MAX_AGE_DAYS * 86_400_000;

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&rsquo;|&#8217;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '';

/** The latest news about the Pope from Vatican News (official RSS), newest first. */
export async function getVaticanNews(limit = 6): Promise<FeedItem[]> {
  try {
    const res = await fetch('https://www.vaticannews.va/en/pope.rss.xml', { next: { revalidate: HOUR } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, it]) => ({
        title: decode(tag(it, 'title')),
        summary: decode(tag(it, 'description')).replace(/\s*Read all\s*$/, ''),
        link: decode(tag(it, 'link')),
        date: new Date(decode(tag(it, 'pubDate'))).toISOString(),
        image: it.match(/<media:content[^>]+url="([^"]+)"/)?.[1],
      }))
      .filter((i) => i.title && i.link.startsWith('https://www.vaticannews.va/') && fresh(i.date))
      .slice(0, limit);
  } catch (error) {
    console.error('Could not load Vatican News:', error);
    return [];
  }
}

/** New homilies and pastoral letters from the diocese website, only if published in the last two weeks. */
export async function getDioceseNews(): Promise<FeedItem[]> {
  const kinds: [string, string][] = [
    ['homily', 'Homily'],
    ['letter', 'Pastoral letter'],
  ];
  try {
    const lists = await Promise.all(
      kinds.map(async ([type, kind]) => {
        const res = await fetch(`https://www.rcdai.org.uk/wp-json/wp/v2/${type}?per_page=5&_fields=date_gmt,link,title,excerpt`, { next: { revalidate: HOUR } });
        if (!res.ok) return [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const posts: any[] = await res.json();
        return posts.map((p) => ({
          title: decode(p.title?.rendered ?? ''),
          summary: decode(p.excerpt?.rendered ?? ''),
          link: String(p.link ?? ''),
          date: new Date(`${p.date_gmt}Z`).toISOString(),
          kind,
        }));
      }),
    );
    return lists
      .flat()
      .filter((i) => i.title && i.link.startsWith('https://www.rcdai.org.uk/') && fresh(i.date))
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error('Could not load diocese news:', error);
    return [];
  }
}

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
/** Daily Mass videos, the daily Gospel and photo reposts are left out; only real news stories are shown. */
const NOT_NEWS = [/^holy mass\b/i, /^gospel\b/i, /^photos? from\b/i, /’s post$|'s post$/i, /^today the church celebrates\b/i];

/** The latest news from the Bishops' Conference of Scotland (bcos.org.uk), read from its news list. */
export async function getScotlandNews(limit = 1): Promise<FeedItem[]> {
  try {
    const res = await fetch('https://www.bcos.org.uk/', { next: { revalidate: HOUR } });
    if (!res.ok) return [];
    const page = await res.text();
    return page
      .split('class="list-post"')
      .slice(1)
      .map((block) => {
        const a = block.match(/<h3 class="list-title">\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
        const d = block.match(/<\/svg>\s*(\d{1,2}) ([A-Z][a-z]{2}), (\d{4})/);
        // Facebook-hosted pictures expire after a few days, so only pictures on the Conference's own site are used.
        const img = block.match(/<div class="list-gallery">[\s\S]*?<img[^>]+src="([^"]+)"/)?.[1];
        const ownImage = img && !/fbcdn\.net|facebook\.com/.test(img) ? img : undefined;
        const desc = block.match(/<div class="list-description">([\s\S]*?)<\/div>/)?.[1] ?? '';
        if (!a || !d) return null;
        const title = decode(a[2]).normalize('NFKC');
        return {
          title,
          summary: decode(desc).normalize('NFKC').replace(title, '').replace(/^[\s.,:;|]+/, '').trim(),
          link: a[1],
          date: new Date(Date.UTC(+d[3], MONTHS[d[2]] ?? 0, +d[1], 12)).toISOString(),
          image: ownImage ? new URL(ownImage, 'https://www.bcos.org.uk/').toString() : undefined,
        } as FeedItem;
      })
      .filter((i): i is FeedItem => !!i && i.link.startsWith('https://www.bcos.org.uk/') && !NOT_NEWS.some((r) => r.test(i.title)) && fresh(i.date))
      .slice(0, limit);
  } catch (error) {
    console.error('Could not load Scotland news:', error);
    return [];
  }
}
