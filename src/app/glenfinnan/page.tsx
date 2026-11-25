import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { ChurchPage } from '@/components/site/ChurchPage';
import { CHURCHES } from '@/lib/content';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'St Mary & St Finnan, Glenfinnan',
  description: CHURCHES.glenfinnan.summary,
  alternates: { canonical: '/glenfinnan' },
  openGraph: shareCard('/glenfinnan', sharePhoto('/img/glenfinnan-exterior.jpg', 'St Mary & St Finnan above Loch Shiel')),
};

export default function Page() {
  return <ChurchPage church={CHURCHES.glenfinnan} />;
}
