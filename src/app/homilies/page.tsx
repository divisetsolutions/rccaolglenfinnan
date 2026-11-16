import type { Metadata } from 'next';
import { ArticleList } from '@/components/site/ArticleView';
import { PageHeader, Section } from '@/components/site/Bits';
import { getArticles } from '@/lib/data';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Homilies',
  description: 'Homilies from the Catholic parish of Caol and Glenfinnan.',
  alternates: { canonical: '/homilies' },
};

export default async function Page() {
  const articles = await getArticles('homily');
  return (
    <>
      <PageHeader title="Homilies" lede="Fr Charles’s Sunday homilies, to read again during the week or to share with someone who could not be at Mass." image="/img/caol-interior.jpg" />
      <Section>
        <ArticleList articles={articles} base="/homilies" empty="Homilies will appear here each week." />
      </Section>
    </>
  );
}
