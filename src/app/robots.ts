import type { MetadataRoute } from 'next';
import { PARISH } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }], sitemap: `${PARISH.url}/sitemap.xml` };
}
