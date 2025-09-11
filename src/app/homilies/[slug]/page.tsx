import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { Metadata } from 'next';
import Image from 'next/image';

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
  return homilyDoc.data();
}

export default async function HomilyArticlePage({ params }: { params: { slug: string } }) {
  const homilyData = await getHomilyData(params.slug);

  if (!homilyData) {
    return <div>Article not found</div>;
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      {homilyData.featuredImageUrl && (
        <div className="relative mb-8 h-60 w-full overflow-hidden rounded-lg md:h-80">
          <Image
            src={homilyData.featuredImageUrl}
            alt={homilyData.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {homilyData.title}
        </h1>
        {homilyData.excerpt && (
          <p className="max-w-[700px] text-lg text-muted-foreground">
            {homilyData.excerpt}
          </p>
        )}
      </div>

      <div
        className="prose mx-auto mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: homilyData.content }}
      />
    </article>
  );
}
