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
  createdAt: Timestamp | string;
}

const NewsHighlights = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const responseVatican = await fetch('/api/vatican-news');
        const vaticanArticle = await responseVatican.json();

        const responseDiocese = await fetch('/api/diocese-news');
        const dioceseArticle = await responseDiocese.json();

        let combinedNews: NewsArticle[] = [];

        const newsCollection = collection(db, 'news');
        let firestoreLimit = 3;
        if (vaticanArticle && dioceseArticle) {
          firestoreLimit = 1;
        } else if (vaticanArticle || dioceseArticle) {
          firestoreLimit = 2;
        }
        const q = query(newsCollection, orderBy('createdAt', 'desc'), limit(firestoreLimit));
        const newsSnapshot = await getDocs(q);
        const firestoreNewsList = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsArticle[];

        if (vaticanArticle) combinedNews.push(vaticanArticle);
        if (dioceseArticle) combinedNews.push(dioceseArticle);
        combinedNews = combinedNews.concat(firestoreNewsList);

        setNews(combinedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getCategory = (item: NewsArticle) => {
    if (item.id.startsWith('vatican-')) return 'Vatican';
    if (item.id.startsWith('diocese-')) return 'Diocese';
    return 'Parish';
  };

  const formatDate = (createdAt: NewsArticle['createdAt']) => {
    if (!createdAt) return null;
    const d =
      typeof createdAt === 'string' ? new Date(createdAt) : createdAt.toDate();
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const buildHref = (item: NewsArticle) => {
    if (
      item.id.startsWith('vatican-') ||
      (item.slug && (item.slug.startsWith('http://') || item.slug.startsWith('https://')))
    ) {
      return item.slug;
    }
    return `/news/${item.slug || item.id}`;
  };

  const isExternal = (item: NewsArticle) =>
    item.id.startsWith('vatican-') || item.id.startsWith('diocese-');

  return (
    <section className="bg-ivory py-[72px] md:py-[108px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9">
          <div>
            <h2 className="font-display text-navy text-[clamp(2rem,4.2vw,3.4rem)] tracking-[-0.015em] leading-[1.05]">
              The Latest News.
            </h2>
          </div>
          <Link
            href="/news"
            className="smallcaps text-navy nav-link hidden md:inline-block"
            data-active="false"
          >
            All Stories →
          </Link>
        </div>

        <hr className="gold-rule mb-12" />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-pulse">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div className="aspect-[4/3] bg-ivory-soft" />
                <div className="h-px bg-gold/30 mt-4" />
                <div className="h-4 bg-ivory-soft mt-4 w-1/3" />
                <div className="h-6 bg-ivory-soft mt-4" />
                <div className="h-4 bg-ivory-soft mt-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <p className="font-serif italic text-stone text-center py-8">
            No news available at the moment. Please check back later.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Feature article */}
            {news[0] && (
              <Link
                href={buildHref(news[0])}
                className="lg:col-span-7 group block"
                {...(isExternal(news[0]) && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <div className="relative aspect-[16/10] overflow-hidden ring-1 ring-gold/30">
                  <Image
                    src={news[0].featuredImageUrl || '/hero-image.jpg'}
                    alt={news[0].title}
                    fill
                    sizes="(max-width:1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6 flex items-center gap-3 smallcaps text-stone">
                  <span className="text-gold">{getCategory(news[0])}</span>
                  <span className="text-gold/40">·</span>
                  <span className="font-sans tabular-nums">{formatDate(news[0].createdAt)}</span>
                </div>
                <h3 className="mt-3 font-display text-navy text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.1] tracking-tight group-hover:text-oxblood transition-colors">
                  {news[0].title}
                </h3>
                <p className="mt-4 font-serif text-ink/85 text-[1.05rem] leading-[1.65] max-w-2xl">
                  {news[0].excerpt}
                </p>
                <span className="mt-5 smallcaps text-navy inline-block nav-link" data-active="false">
                  Continue reading →
                </span>
              </Link>
            )}

            {/* Sidebar list */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-gold/25">
              {news.slice(1, 4).map((item) => (
                <Link
                  key={item.id}
                  href={buildHref(item)}
                  className="group py-7 first:pt-0 last:pb-0 grid grid-cols-[120px_1fr] gap-5 items-start"
                  {...(isExternal(item) && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-gold/30">
                    <Image
                      src={item.featuredImageUrl || '/hero-image.jpg'}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 smallcaps text-stone">
                      <span className="text-gold">{getCategory(item)}</span>
                      <span className="text-gold/40">·</span>
                      <span className="font-sans tabular-nums">{formatDate(item.createdAt)}</span>
                    </div>
                    <h4 className="mt-2 font-display text-navy text-[1.2rem] leading-[1.2] tracking-tight group-hover:text-oxblood transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-2 font-serif text-stone text-sm line-clamp-2">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 text-center md:hidden">
          <Link href="/news" className="smallcaps text-navy nav-link" data-active="false">
            All Stories →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsHighlights;
