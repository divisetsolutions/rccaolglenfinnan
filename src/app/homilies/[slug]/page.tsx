import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { Metadata } from 'next';
import { ArticleShell, Article } from '@/components/ArticleShell';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const homilyData = await getHomilyData(params.slug);
  return {
    title: homilyData?.title,
    description: homilyData?.excerpt,
  };
}

export async function generateStaticParams() {
  const q = query(collection(db, 'news'), where('type', '==', 'homily'));
  const homilySnapshot = await getDocs(q);
  return homilySnapshot.docs.map((doc) => ({
    slug: doc.id,
  }));
}

async function getHomilyData(slug: string) {
  const homilyDoc = await getDoc(doc(db, 'news', slug));
  return homilyDoc.data() as Article | undefined;
}

export default async function HomilyArticlePage({ params }: { params: { slug: string } }) {
  const homilyData = await getHomilyData(params.slug);

  if (!homilyData) {
    return <div>Article not found</div>;
  }

  return <ArticleShell article={homilyData} />;
}
