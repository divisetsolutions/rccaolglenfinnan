import type { Metadata } from 'next';
import { PARISH } from './content';

type ShareImage = { url: string; width?: number; height?: number; alt: string };

/** Most site photos are 2200 x 991 banners. */
export const sharePhoto = (url: string, alt: string): ShareImage => ({ url, width: 2200, height: 991, alt });

/**
 * Open Graph data for a page, so a link shared on Facebook, WhatsApp and the like
 * shows that page's own title, description and photo. A page that sets its own
 * openGraph replaces the site-wide one entirely, so the shared fields are repeated here.
 * Title and description are filled in by Next.js from the page's own metadata.
 */
export const shareCard = (path: string, image: ShareImage, type: 'website' | 'article' = 'website'): Metadata['openGraph'] => ({
  type,
  siteName: PARISH.full,
  locale: 'en_GB',
  url: path,
  images: [image],
});
