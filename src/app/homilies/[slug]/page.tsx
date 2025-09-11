import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const homilyData = await getHomilyData(params.slug);
  return {
    title: homilyData?.title,
    description: homilyData?.excerpt,
  };
}

export async function generateStaticParams() {
  const q = query(collection(db, 'news'), where('type', '==', 'Homily'));
  const homilySnapshot = await getDocs(q);
  return homilySnapshot.docs.map((doc) => ({
    slug: doc.id,
  }));
}

async function getHomilyData(slug: string) {
  const homilyDoc = await getDoc(doc(db, 'news', slug));
  return homilyDoc.data();
}

export default async function HomilyArticlePage({ params }: { params: { slug: string } }) {
  const homilyData = await getHomilyData(params.slug);

  if (!homilyData) {
    return <div>Article not found</div>;
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {homilyData.title}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {homilyData.excerpt}
        </p>
        <div dangerouslySetInnerHTML={{ __html: homilyData.content }} />
      </div>
    </section>
  );
}
