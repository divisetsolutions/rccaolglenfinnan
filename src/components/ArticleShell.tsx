'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Define a type for the article data for type safety
export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImageUrl?: string;
  createdAt: string;
  type?: string;
  eventStartDate?: string | Date;
  eventEndDate?: string | Date;
  eventLocation?: string;
};

interface ArticleShellProps {
  article: Article;
}

export function ArticleShell({ article }: ArticleShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="container max-w-3xl py-6 lg:py-10">
        {article.featuredImageUrl && (
          <div
            className="relative mb-8 h-60 w-full cursor-pointer overflow-hidden rounded-lg md:h-80"
            onClick={() => setOpen(true)}
          >
            <Image
              src={article.featuredImageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {article.title}
          </h1>
          {article.createdAt && (
            <p className="text-sm text-muted-foreground">
              <em>
                Published: {new Date(article.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </em>
            </p>
          )}
          {article.excerpt && (
            <p className="max-w-[700px] text-lg text-muted-foreground">
              {article.excerpt}
            </p>
          )}
        </div>

        <div
          className="prose mx-auto mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.type === 'event' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: article.title,
                startDate: article.eventStartDate.toDate(),
                endDate: article.eventEndDate.toDate(),
                location: {
                  '@type': 'Place',
                  name: article.eventLocation,
                },
                description: article.excerpt,
              }),
            }}
          />
        )}
      </article>

      {article.featuredImageUrl && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: article.featuredImageUrl }]}
        />
      )}
    </>
  );
}
