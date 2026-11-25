import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { ArticleList } from '@/components/site/ArticleView';
import { PageHeader, Section } from '@/components/site/Bits';
import { getArticles } from '@/lib/data';
import { FromRome, FromScotland, FromTheDiocese } from '@/components/site/FeedSections';
import { getDioceseNews, getScotlandNews, getVaticanNews } from '@/lib/feeds';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'News',
  description: 'News from the Catholic parish of Caol and Glenfinnan, with stories from the Diocese of Argyll and the Isles and the wider Church.',
  alternates: { canonical: '/news' },
  openGraph: shareCard('/news', sharePhoto('/img/loch.jpg', 'Still water and pine woods in the West Highlands')),
};

export default async function Page() {
  const [articles, rome, scotland, diocese] = await Promise.all([getArticles('news'), getVaticanNews(1), getScotlandNews(1), getDioceseNews()]);
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
      {(scotland.length > 0 || rome.length > 0) && (
        <Section tone={diocese.length > 0 ? 'mist' : 'white'}>
          <div className="grid gap-12 md:grid-cols-2">
            <FromScotland items={scotland} />
            <FromRome items={rome} />
          </div>
        </Section>
      )}
    </>
  );
}
