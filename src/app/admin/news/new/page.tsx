'use client';

import { ArticleForm, ArticleData } from '@/components/admin/ArticleForm';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NewNewsArticlePage() {

  const handleCreateArticle = async (data: ArticleData, imageFile: File | null) => {
    let featuredImageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `news-images/${data.slug}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      featuredImageUrl = await getDownloadURL(imageRef);
    }

    const articleToSave: Omit<ArticleData, 'slug'> & { featuredImageUrl?: string; createdAt: Timestamp; updatedAt: Timestamp; } = {
      ...data,
      featuredImageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(doc(db, 'news', data.slug), articleToSave);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Article</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new article, event, or homily.</p>
      </div>
      <ArticleForm onSubmit={handleCreateArticle} buttonText="Create Article" />
    </div>
  );
}
