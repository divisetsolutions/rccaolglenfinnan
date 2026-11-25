import type { Metadata, Viewport } from 'next';
import { Alegreya, Atkinson_Hyperlegible } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { ArchDefs } from '@/components/site/Bits';
import { PARISH } from '@/lib/content';
import { siteGraph } from '@/lib/structured-data';

// Alegreya: a calligraphic book face with real warmth at large sizes.
const display = Alegreya({ subsets: ['latin'], display: 'swap', variable: '--font-display', style: ['normal', 'italic'] });
// Atkinson Hyperlegible: designed by the Braille Institute so that every letter is unmistakable.
const body = Atkinson_Hyperlegible({ subsets: ['latin'], display: 'swap', variable: '--font-body', weight: ['400', '700'], style: ['normal', 'italic'], preload: false });

const description =
  'Mass times, sacraments and parish life at St John the Evangelist, Caol (Fort William) and St Mary & St Finnan, Glenfinnan, in the Diocese of Argyll and the Isles.';

export const metadata: Metadata = {
  metadataBase: new URL(PARISH.url),
  title: { default: 'Catholic Parish of Caol and Glenfinnan | Mass times in Fort William and Glenfinnan', template: '%s | Caol and Glenfinnan Parish' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: PARISH.full,
    title: 'Catholic Parish of Caol and Glenfinnan',
    description,
    locale: 'en_GB',
    images: [{ url: '/img/glenfinnan-exterior.jpg', width: 2200, height: 991, alt: 'St Mary & St Finnan above Loch Shiel' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/img/crest.png', apple: '/img/crest.png' },
};

export const viewport: Viewport = { themeColor: '#10323f' };

const jsonLd = siteGraph();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`} data-season="ordinary">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ArchDefs />
        {/* The admin area has its own AuthProvider (src/app/admin/layout.tsx), so public pages do not load Firebase Auth. */}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
