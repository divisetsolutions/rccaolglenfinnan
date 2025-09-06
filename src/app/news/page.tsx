import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Link from 'next/link';

async function getNews() {
  const newsCollection = collection(db, 'news');
  const q = query(newsCollection, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
  const newsSnapshot = await getDocs(q);
  const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return newsList;
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          News & Events
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Stay up to date with the latest news and events from both parishes.
        </p>
      </div>
      <div className="grid gap-4">
        {news.map(article => (
          <Link key={article.id} href={`/news/${article.id}`}>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-muted-foreground">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
