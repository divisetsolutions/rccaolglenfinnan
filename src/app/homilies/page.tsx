import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { ArticleList } from '@/components/site/ArticleView';
import { BookFeature } from '@/components/site/BookFeature';
import { PageHeader, Section } from '@/components/site/Bits';
import { getArticles } from '@/lib/data';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Homilies',
  description: 'Sunday and feast-day homilies by Fr Charles Egbon, parish priest of Caol (Fort William) and Glenfinnan, to read again during the week or share with someone who could not be at Mass.',
  alternates: { canonical: '/homilies' },
  openGraph: shareCard('/homilies', sharePhoto('/img/fr-charles.jpg', 'Fr Charles Egbon in green vestments above Loch Shiel')),
};

export default async function Page() {
  const articles = await getArticles('homily');
  return (
    <>
      <PageHeader title="Homilies" lede="Fr Charles’s Sunday homilies, to read again during the week or to share with someone who could not be at Mass." image="/img/caol-interior.jpg" />
      <Section>
        <ArticleList articles={articles} base="/homilies" empty="Homilies will appear here each week." />
      </Section>
      <BookFeature />
    </>
  );
}
