'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const PhotoGallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const galleriesCollection = collection(db, 'galleries');
        const q = query(galleriesCollection, orderBy('createdAt', 'desc'));
        const galleriesSnapshot = await getDocs(q);
        const galleriesList = galleriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Gallery[];
        setGalleries(galleriesList);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (loading) {
    return <div className="text-center">Loading galleries...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleries.map(gallery => (
        <Link key={gallery.id} href={`/gallery/${gallery.id}`}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="relative h-48 w-full">
                <Image
                  src={gallery.coverImageUrl || '/hero-image.jpg'}
                  alt={gallery.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{gallery.title}</CardTitle>
              <CardDescription>{gallery.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PhotoGallery;
