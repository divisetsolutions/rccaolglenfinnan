import { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'A collection of photos from our parishes.',
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Photo Gallery</h1>
      <PhotoGallery />
    </div>
  );
}
