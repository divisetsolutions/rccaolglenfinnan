import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/site/ArticleView';
import { getArticle, getArticles } from '@/lib/data';
import { PARISH } from '@/lib/content';
import { PARISH_ID, PRIEST_ID, plainSummary } from '@/lib/structured-data';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles('homily')).map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt || plainSummary(article.content), alternates: { canonical: `/homilies/${article.id}` }, openGraph: shareCard(`/homilies/${article.id}`, sharePhoto('/img/fr-charles.jpg', 'Fr Charles Egbon in green vestments above Loch Shiel'), 'article') } : { title: 'Not found' };
}

export default async function Page({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article || article.status !== 'published') notFound();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || plainSummary(article.content),
    datePublished: article.date ?? undefined,
    image: article.featuredImageUrl,
    url: `${PARISH.url}/homilies/${article.id}`,
    mainEntityOfPage: `${PARISH.url}/homilies/${article.id}`,
    inLanguage: 'en-GB',
    author: { '@id': PRIEST_ID },
    publisher: { '@id': PARISH_ID },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ArticleView article={article} back={{ href: '/homilies', label: 'All homilies' }} />
    </>
  );
}
