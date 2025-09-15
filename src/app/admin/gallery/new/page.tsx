'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function NewGalleryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !images) {
      alert('Please provide a title and at least one image.');
      return;
    }

    setUploading(true);

    try {
      const imageUrls = await Promise.all(
        Array.from(images).map(async (image) => {
          const storageRef = ref(storage, `galleries/${Date.now()}-${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      await addDoc(collection(db, 'galleries'), {
        title,
        description,
        coverImageUrl: imageUrls[0],
        images: imageUrls.map(url => ({ url })),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/gallery');
    } catch (error) {
      console.error('Error creating gallery:', error);
      alert('Failed to create gallery. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Gallery</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="images">Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            required
          />
        </div>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Creating...' : 'Create Gallery'}
        </Button>
      </form>
    </div>
  );
}
