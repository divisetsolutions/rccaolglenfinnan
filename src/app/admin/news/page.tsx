'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchNews = async () => {
    const newsCollection = collection(db, 'news');
    const q = query(newsCollection, orderBy('createdAt', 'desc'));
    const newsSnapshot = await getDocs(q);
    const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
    setArticles(newsList);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteDoc(doc(db, 'news', id));
      fetchNews(); // Refresh the list
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Manage News & Events
        </h1>
        <Link href="/admin/news/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Article
        </Link>
      </div>
      <div className="grid gap-4">
        {articles.map(article => (
          <div key={article.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-muted-foreground">{article.excerpt}</p>
            </div>
            <div>
              <Link href={`/admin/news/edit/${article.id}`} className="text-blue-500 hover:underline mr-4">Edit</Link>
              <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
