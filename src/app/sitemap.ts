import type { MetadataRoute } from 'next';
import { PARISH } from '@/lib/content';
import { getArticles } from '@/lib/data';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/calendar', '/about', '/caol', '/glenfinnan', '/sacraments', '/news', '/homilies', '/newsletters', '/gallery', '/contact', '/donations', '/prayer-requests', '/safeguarding'];
  const [news, homilies] = await Promise.all([getArticles('news'), getArticles('homily')]);
  return [
    ...pages.map((p) => ({ url: `${PARISH.url}${p}`, changeFrequency: 'weekly' as const, priority: p === '' || p === '/calendar' ? 1 : 0.7 })),
    ...news.map((a) => ({ url: `${PARISH.url}/news/${a.id}`, lastModified: a.date ?? undefined })),
    ...homilies.map((a) => ({ url: `${PARISH.url}/homilies/${a.id}`, lastModified: a.date ?? undefined })),
  ];
}
