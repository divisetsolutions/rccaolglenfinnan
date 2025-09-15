'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  caption?: string;
}

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [existingImages, setExistingImages] = useState<GalleryImage[]>([]);
  const [newImages, setNewImages] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchGallery = async () => {
        const galleryDoc = await getDoc(doc(db, 'galleries', id as string));
        if (galleryDoc.exists()) {
          const galleryData = galleryDoc.data();
          setTitle(galleryData.title);
          setDescription(galleryData.description);
          setExistingImages(galleryData.images || []);
        }
      };
      fetchGallery();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const newImageUrls = newImages ? await Promise.all(
        Array.from(newImages).map(async (image) => {
          const storageRef = ref(storage, `galleries/${id}/${Date.now()}-${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      ) : [];

      const updatedImages = [
        ...existingImages,
        ...newImageUrls.map(url => ({ url }))
      ];

      await updateDoc(doc(db, 'galleries', id as string), {
        title,
        description,
        images: updatedImages,
        coverImageUrl: updatedImages[0]?.url || '',
        updatedAt: serverTimestamp(),
      });

      router.push('/admin/gallery');
    } catch (error) {
      console.error('Error updating gallery:', error);
      alert('Failed to update gallery. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        setExistingImages(existingImages.filter(img => img.url !== imageUrl));
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Gallery</h1>
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
          <Label>Existing Images</Label>
          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <Image src={image.url} alt="" width={150} height={150} className="rounded-md" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => handleDeleteImage(image.url)}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="newImages">Add New Images</Label>
          <Input
            id="newImages"
            type="file"
            multiple
            onChange={(e) => setNewImages(e.target.files)}
          />
        </div>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Updating...' : 'Update Gallery'}
        </Button>
      </form>
    </div>
  );
}
