import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Galleries',
  description: 'View photo galleries from the parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

const galleries = [
  {
    id: 'caol',
    name: 'St. John the Evangelist, Caol',
    imageUrl: '/hero-caol-1.jpg',
  },
  {
    id: 'glenfinnan',
    name: 'St. Mary & St. Finnan, Glenfinnan',
    imageUrl: '/hero-glenfinnan-1.jpg',
  },
];

export default function GalleryPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Photo Galleries
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery) => (
          <Link href={`/gallery/${gallery.id}`} key={gallery.id}>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={gallery.imageUrl}
                alt={gallery.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white text-center">{gallery.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
