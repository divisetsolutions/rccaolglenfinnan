
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

const NewsHighlights = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, 'news');
        const q = query(newsCollection, orderBy('createdAt', 'desc'), limit(3));
        const newsSnapshot = await getDocs(q);
        const newsList = newsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsArticle[];
        setNews(newsList);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto text-center">
          <p>Loading news...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.excerpt}</p>
              <Link href={`/news/${item.slug}`} className="text-blue-500 hover:underline">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsHighlights;
