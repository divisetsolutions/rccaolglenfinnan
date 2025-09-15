import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';

export async function generateStaticParams() {
  return [{ parish: 'caol' }, { parish: 'glenfinnan' }];
}

async function getParishData(parishId: string) {
  const parishDoc = await getDoc(doc(db, 'parishes', parishId));
  return parishDoc.data();
}

const photos = [
  '/hero-caol-1.jpg',
  '/hero-caol-2.jpg',
  '/hero-glenfinnan-1.jpg',
  '/hero-glenfinnan-2.jpg',
  '/hero-image.jpg',
];

// @ts-expect-error: Next.js 15 type inference issue with PageProps
export default async function ParishGalleryPage({ params }: { params: { parish: string } }) {
  const parishData = await getParishData(params.parish);

  if (!parishData) {
    return <div>Parish not found</div>;
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        {parishData.name} Photo Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
