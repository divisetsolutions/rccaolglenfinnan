import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Schedule } from '@/components/Schedule';

export async function generateStaticParams() {
  return [{ parish: 'caol' }, { parish: 'glenfinnan' }];
}

async function getParishData(parishId: string) {
  const parishDoc = await getDoc(doc(db, 'parishes', parishId));
  return parishDoc.data();
}

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
      </div>
    </section>
  );
}
