import type { Metadata } from 'next';
import { ChurchPage } from '@/components/site/ChurchPage';
import { CHURCHES } from '@/lib/content';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'St John the Evangelist, Caol',
  description: CHURCHES.caol.summary,
  alternates: { canonical: '/caol' },
};

export default function Page() {
  return <ChurchPage church={CHURCHES.caol} />;
}
