import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {newsData.title}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {newsData.excerpt}
        </p>
        <div dangerouslySetInnerHTML={{ __html: newsData.content }} />
      </div>
    </section>
  );
}
