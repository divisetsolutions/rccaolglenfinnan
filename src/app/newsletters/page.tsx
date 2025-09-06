import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';

async function getNewsletters() {
  const newslettersCollection = collection(db, 'newsletters');
  const q = query(newslettersCollection, orderBy('issueDate', 'desc'));
  const newslettersSnapshot = await getDocs(q);
  const newslettersList = newslettersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return newslettersList;
}

export default async function NewslettersPage() {
  const newsletters = await getNewsletters();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Newsletters
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Download the latest newsletters from both parishes.
        </p>
      </div>
      <div className="grid gap-4">
        {newsletters.map(newsletter => (
          <Link key={newsletter.id} href={newsletter.fileUrl} target="_blank" rel="noopener noreferrer">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold">{newsletter.title}</h3>
              <p className="text-muted-foreground">{new Date(newsletter.issueDate.seconds * 1000).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
