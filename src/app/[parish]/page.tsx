import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Schedule } from '@/components/Schedule';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { parish: string } }): Promise<Metadata> {
  const parishData = await getParishData(params.parish);
  return {
    title: parishData?.name,
    description: `Information about ${parishData?.name}`,
  };
}

export async function generateStaticParams() {
  return [{ parish: 'caol' }, { parish: 'glenfinnan' }];
}

async function getParishData(parishId: string) {
  const parishDoc = await getDoc(doc(db, 'parishes', parishId));
  return parishDoc.data();
}

// @ts-expect-error: Next.js 15 type inference issue with PageProps
export default async function ParishPage({ params }: { params: { parish: string } }) {
  const parishData = await getParishData(params.parish);

  if (!parishData) {
    return <div>Parish not found</div>;
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {parishData.name}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {parishData.address}
        </p>
        <div dangerouslySetInnerHTML={{ __html: parishData.aboutContent }} />
        <h2 className="text-2xl font-bold mt-8">Mass & Service Times</h2>
        <Schedule parishId={params.parish} />

        <h2 className="text-2xl font-bold mt-8">Clergy</h2>
        <div dangerouslySetInnerHTML={{ __html: parishData.clergyInfo }} />

        <h2 className="text-2xl font-bold mt-8">Contact</h2>
        <p>Email: <a href={`mailto:${parishData.contactInfo.email}`} className="text-blue-500 hover:underline">{parishData.contactInfo.email}</a></p>
        <p>Phone: {parishData.contactInfo.phone}</p>
      </div>
    </section>
  );
}
