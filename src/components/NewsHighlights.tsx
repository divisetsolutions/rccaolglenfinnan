
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { collection, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImageUrl?: string;
  createdAt: Timestamp | string; // Allow string for Vatican News
}

const NewsHighlights = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch Vatican News from API route
        const responseVatican = await fetch('/api/vatican-news');
        const vaticanArticle = await responseVatican.json();

        // Fetch Diocese News from API route
        const responseDiocese = await fetch('/api/diocese-news');
        const dioceseArticle = await responseDiocese.json();

        let combinedNews: NewsArticle[] = [];

        // Fetch Firestore News (limit to 1 if Vatican and Diocese articles exist, else adjust)
        const newsCollection = collection(db, 'news');
        let firestoreLimit = 3;
        if (vaticanArticle && dioceseArticle) {
          firestoreLimit = 1;
        } else if (vaticanArticle || dioceseArticle) {
          firestoreLimit = 2;
        }
        const q = query(newsCollection, orderBy('createdAt', 'desc'), limit(firestoreLimit));
        const newsSnapshot = await getDocs(q);
        const firestoreNewsList = newsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsArticle[];

        if (vaticanArticle) {
          combinedNews.push(vaticanArticle);
        }
        if (dioceseArticle) {
          combinedNews.push(dioceseArticle);
        }
        combinedNews = combinedNews.concat(firestoreNewsList);

        setNews(combinedNews);
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
        {news.length === 0 ? (
          <div className="text-center">
            <p>No news available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link 
                key={item.id} 
                href={item.id.startsWith('vatican-') || (item.slug && (item.slug.startsWith('http://') || item.slug.startsWith('https://'))) ? item.slug : `/news/${item.slug || item.id}`} 
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                {...(item.id.startsWith('vatican-') && { target: "_blank", rel: "noopener noreferrer" })} // Open Vatican links in new tab
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.featuredImageUrl || '/hero-image.jpg'}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  {item.createdAt && (
                    <p className="text-sm text-muted-foreground">
                      <em>
                        Published: {new Date(typeof item.createdAt === 'string' ? item.createdAt : item.createdAt.toDate()).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </em>
                    </p>
                  )}
                  <p className="text-gray-700 mb-4">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsHighlights;
