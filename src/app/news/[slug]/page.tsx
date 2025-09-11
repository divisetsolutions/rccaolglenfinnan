import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const newsData = await getNewsData(params.slug);
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
  return newsDoc.data();
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const newsData = await getNewsData(params.slug);

  if (!newsData) {
    return <div>Article not found</div>;
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      {newsData.featuredImageUrl && (
        <div className="relative mb-8 h-60 w-full overflow-hidden rounded-lg md:h-80">
          <Image
            src={newsData.featuredImageUrl}
            alt={newsData.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {newsData.title}
        </h1>
        {newsData.excerpt && (
          <p className="max-w-[700px] text-lg text-muted-foreground">
            {newsData.excerpt}
          </p>
        )}
      </div>

      <div
        className="prose mx-auto mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: newsData.content }}
      />

      {newsData.type === 'event' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: newsData.title,
              startDate: newsData.eventStartDate.toDate(),
              endDate: newsData.eventEndDate.toDate(),
              location: {
                '@type': 'Place',
                name: newsData.eventLocation,
              },
              description: newsData.excerpt,
            }),
          }}
        />
      )}
    </article>
  );
}
