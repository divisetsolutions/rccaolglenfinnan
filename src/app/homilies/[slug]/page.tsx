import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/site/ArticleView';
import { getArticle, getArticles } from '@/lib/data';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles('homily')).map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/homilies/${article.id}` } } : { title: 'Not found' };
}

export default async function Page({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article || article.status !== 'published') notFound();
  return <ArticleView article={article} back={{ href: '/homilies', label: 'All homilies' }} />;
}
