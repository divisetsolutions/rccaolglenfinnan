import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/site/ArticleView';
import { getArticle, getArticles } from '@/lib/data';
import { PARISH } from '@/lib/content';
import { PARISH_ID, plainSummary } from '@/lib/structured-data';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles('news')).map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt || plainSummary(article.content), alternates: { canonical: `/news/${article.id}` }, openGraph: shareCard(`/news/${article.id}`, article.featuredImageUrl ? { url: article.featuredImageUrl, alt: article.featuredImageCaption || article.title } : sharePhoto('/img/loch.jpg', 'Still water and pine woods in the West Highlands'), 'article') } : { title: 'Not found' };
}

export default async function Page({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article || article.status !== 'published') notFound();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || plainSummary(article.content),
    datePublished: article.date ?? undefined,
    image: article.featuredImageUrl,
    url: `${PARISH.url}/news/${article.id}`,
    mainEntityOfPage: `${PARISH.url}/news/${article.id}`,
    inLanguage: 'en-GB',
    publisher: { '@id': PARISH_ID },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ArticleView article={article} back={{ href: '/news', label: 'All news' }} />
    </>
  );
}
