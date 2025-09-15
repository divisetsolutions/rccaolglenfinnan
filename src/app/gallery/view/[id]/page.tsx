import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Metadata } from 'next';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  caption?: string;
}

interface Gallery {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  images: GalleryImage[];
}

async function getGalleryData(id: string) {
  const galleryDoc = await getDoc(doc(db, 'galleries', id));
  const galleryData = galleryDoc.data();

  if (galleryData) {
    // Convert Timestamps to strings if necessary
    if (galleryData.createdAt && galleryData.createdAt.toDate) {
      galleryData.createdAt = galleryData.createdAt.toDate().toISOString();
    }
    if (galleryData.updatedAt && galleryData.updatedAt.toDate) {
      galleryData.updatedAt = galleryData.updatedAt.toDate().toISOString();
    }
  }

  return galleryData as Gallery | undefined;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const galleryData = await getGalleryData(params.id);
  return {
    title: galleryData?.title,
    description: galleryData?.description,
  };
}

export default async function GalleryDetailPage({ params }: { params: { id: string } }) {
  const galleryData = await getGalleryData(params.id);

  if (!galleryData) {
    return <div>Gallery not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">{galleryData.title}</h1>
      <p className="text-center text-gray-600 mb-8">{galleryData.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryData.images.map((image, index) => (
          <div key={index} className="relative h-64 w-full">
            <Image
              src={image.url}
              alt={image.caption || galleryData.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                <p>{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
