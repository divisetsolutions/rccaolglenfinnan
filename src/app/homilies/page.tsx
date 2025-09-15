import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sunday Homilies',
  description: 'Read the latest Sunday Homilies from the parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

async function getHomilies() {
  const newsCollection = collection(db, 'news');
    const q = query(newsCollection, where('status', '==', 'published'), where('type', '==', 'homily'), orderBy('createdAt', 'desc'));
  const newsSnapshot = await getDocs(q);
  const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return newsList;
}

export default async function HomiliesPage() {
  const homilies = await getHomilies();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Sunday Homilies
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Read the latest Sunday Homilies from both parishes.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {homilies.map(article => (
          <div key={article.id} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-full flex flex-col">
            {article.featuredImageUrl && (
              <Link href={`/homilies/${article.id}`}>
                <div className="relative h-48">
                  <Image
                    src={article.featuredImageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/homilies/${article.id}`}>
                  <span className="hover:underline">{article.title}</span>
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4 flex-grow">{article.excerpt}</p>
              <Link href={`/homilies/${article.id}`}>
                <p className="text-sm font-medium text-blue-500 hover:underline">Read More</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
