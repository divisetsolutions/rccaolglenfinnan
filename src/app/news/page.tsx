import type { Metadata } from 'next';
import { ArticleList } from '@/components/site/ArticleView';
import { PageHeader, Section } from '@/components/site/Bits';
import { getArticles } from '@/lib/data';
import { FromRome, FromTheDiocese } from '@/components/site/FeedSections';
import { getDioceseNews, getVaticanNews } from '@/lib/feeds';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'News',
  description: 'News from the Catholic parish of Caol and Glenfinnan, with stories from the Diocese of Argyll and the Isles and the wider Church.',
  alternates: { canonical: '/news' },
};

export default async function Page() {
  const [articles, rome, diocese] = await Promise.all([getArticles('news'), getVaticanNews(6), getDioceseNews()]);
  return (
    <>
      <PageHeader title="News" lede="What is happening in the parish, the deanery and the diocese." image="/img/glenfinnan-autumn.jpg" />
      <Section>
        <ArticleList articles={articles} base="/news" empty="There is no news posted at the moment. The weekly newsletter carries all current notices." />
      </Section>
      {diocese.length > 0 && (
        <Section tone="white">
          <FromTheDiocese items={diocese} />
        </Section>
      )}
      {rome.length > 0 && (
        <Section tone={diocese.length > 0 ? 'mist' : 'white'}>
          <FromRome items={rome} />
        </Section>
      )}
    </>
  );
}
