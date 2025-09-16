import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Metadata } from 'next';
import { ArticleShell, Article } from '@/components/ArticleShell';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const newsData = await getNewsData(slug);
  return {
    title: newsData?.title,
    description: newsData?.excerpt,
  };
}

export async function generateStaticParams() {
  const newsSnapshot = await getDocs(collection(db, 'news'));
  return newsSnapshot.docs.map((doc) => ({
    slug: doc.id,
  }));
}

async function getNewsData(slug: string) {
  const newsDoc = await getDoc(doc(db, 'news', slug));
  const newsData = newsDoc.data();

  if (newsData) {
    // Convert Timestamps to strings
    if (newsData.createdAt && typeof newsData.createdAt.toDate === 'function') {
      newsData.createdAt = newsData.createdAt.toDate().toISOString();
    } else if (newsData.createdAt instanceof Date) {
      newsData.createdAt = newsData.createdAt.toISOString();
    }
    if (newsData.updatedAt && typeof newsData.updatedAt.toDate === 'function') {
      newsData.updatedAt = newsData.updatedAt.toDate().toISOString();
    } else if (newsData.updatedAt instanceof Date) {
      newsData.updatedAt = newsData.updatedAt.toISOString();
    }

    // Convert event Timestamps to strings
    if (newsData.eventStartDate && typeof newsData.eventStartDate.toDate === 'function') {
      newsData.eventStartDate = newsData.eventStartDate.toDate().toISOString();
    } else if (newsData.eventStartDate instanceof Date) {
      newsData.eventStartDate = newsData.eventStartDate.toISOString();
    }
    if (newsData.eventEndDate && typeof newsData.eventEndDate.toDate === 'function') {
      newsData.eventEndDate = newsData.eventEndDate.toDate().toISOString();
    } else if (newsData.eventEndDate instanceof Date) {
      newsData.eventEndDate = newsData.eventEndDate.toISOString();
    }
  }

  return newsData as Article | undefined;
}

export default async function NewsArticlePage({ params: { slug } }: { params: { slug: string } }) {
  const newsData = await getNewsData(slug);

  if (!newsData) {
    return <div>Article not found</div>;
  }

  return <ArticleShell article={newsData} />;
}
