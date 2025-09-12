'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Gallery {
  id: string;
  title: string;
  description: string;
  images?: { url: string }[];
}

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

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

  const handleDelete = async (galleryId: string) => {
    if (confirm('Are you sure you want to delete this gallery?')) {
      try {
        const galleryDoc = await getDoc(doc(db, 'galleries', galleryId));
        const galleryData = galleryDoc.data() as Gallery;

        if (galleryData.images) {
          for (const image of galleryData.images) {
            const imageRef = ref(storage, image.url);
            await deleteObject(imageRef);
          }
        }

        await deleteDoc(doc(db, 'galleries', galleryId));
        setGalleries(galleries.filter(g => g.id !== galleryId));
      } catch (error) {
        console.error('Error deleting gallery:', error);
        alert('Failed to delete gallery. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Galleries</h1>
        <Button asChild>
          <Link href="/admin/gallery/new">Create Gallery</Link>
        </Button>
      </div>
      {loading ? (
        <p>Loading galleries...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map(gallery => (
            <Card key={gallery.id}>
              <CardHeader>
                <CardTitle>{gallery.title}</CardTitle>
                <CardDescription>{gallery.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/gallery/edit/${gallery.id}`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(gallery.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
