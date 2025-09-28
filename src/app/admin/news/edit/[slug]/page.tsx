'use client';

import { useEffect, useState } from 'react';
import { ArticleForm, ArticleData } from '@/components/admin/ArticleForm';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditNewsArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, 'news', params.slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticle({ slug: docSnap.id, ...docSnap.data() } as ArticleData);
      } else {
        // Handle case where article is not found
        console.error("No such document!");
      }
      setLoading(false);
    };

    fetchArticle();
  }, [params.slug]);

  const handleUpdateArticle = async (data: ArticleData, imageFile: File | null) => {
    const docRef = doc(db, 'news', params.slug);
    let featuredImageUrl = article?.featuredImageUrl || '';

    if (imageFile) {
      const imageRef = ref(storage, `news-images/${params.slug}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      featuredImageUrl = await getDownloadURL(imageRef);
    }

    const articleToUpdate = {
      ...data,
      featuredImageUrl,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, articleToUpdate);
  };

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
        <p className="text-muted-foreground">Modify the details of the article below.</p>
      </div>
      <ArticleForm 
        initialData={article} 
        onSubmit={handleUpdateArticle} 
        buttonText="Save Changes" 
      />
    </div>
  );
}
