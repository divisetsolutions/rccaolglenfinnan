import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/data';
import { longDate } from '@/lib/data';

export function ArticleView({ article, back }: { article: Article; back: { href: string; label: string } }) {
  return (
    <article>
      <header className="bg-loch text-mist">
        <div className="wrap max-w-[860px] pb-14 pt-12 md:pb-20 md:pt-16">
          <Link href={back.href} className="fade-up inline-block font-bold text-gorse hover:underline">
            {back.label}
          </Link>
          <h1 className="display-lg mt-5">
            <span className="line-mask">
              <span>{article.title}</span>
            </span>
          </h1>
          <p className="fade-up mt-5 text-mist/70" style={{ animationDelay: '250ms' }}>
            {longDate(article.date)}
            {article.eventLocation ? `, ${article.eventLocation}` : ''}
          </p>
        </div>
      </header>
      <div className="wrap max-w-[860px] py-12 md:py-16">
        {article.featuredImageUrl && (
          <div className="relative -mt-24 mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lift md:-mt-28">
            <Image src={article.featuredImageUrl} alt="" fill sizes="(max-width: 860px) 100vw, 860px" className="object-cover" priority />
          </div>
        )}
        {article.excerpt && <p className="lede max-w-[60ch] font-display italic">{article.excerpt}</p>}
        <div className="prose-parish mt-6 text-[1.14rem] leading-[1.8]" dangerouslySetInnerHTML={{ __html: article.content ?? '' }} />
        <Link href={back.href} className="btn btn-ghost mt-12">
          {back.label}
        </Link>
      </div>
    </article>
  );
}

export function ArticleList({ articles, base, empty }: { articles: Article[]; base: string; empty: string }) {
  if (articles.length === 0) {
    return <p className="lede max-w-[56ch]">{empty}</p>;
  }
  const [lead, ...rest] = articles;
  return (
    <div>
      <Link href={`${base}/${lead.id}`} className="group grid items-center gap-8 rounded-[2rem] bg-white p-6 shadow-soft md:grid-cols-2 md:p-10">
        <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-mist-2">
          <Image src={lead.featuredImageUrl || '/img/glenfinnan-autumn.jpg'} alt="" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div>
          <p className="text-slate">{longDate(lead.date)}</p>
          <h2 className="display-md mt-2 group-hover:text-heather">{lead.title}</h2>
          <p className="mt-4 text-slate">{lead.excerpt}</p>
          <span className="btn btn-loch mt-6">Read in full</span>
        </div>
      </Link>
      {rest.length > 0 && (
        <ul className="mt-10">
          {rest.map((a) => (
            <li key={a.id}>
              <Link href={`${base}/${a.id}`} className="group grid gap-2 border-t-2 border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8">
                <span className="text-slate">{longDate(a.date)}</span>
                <span>
                  <span className="block font-display text-[1.55rem] font-semibold leading-snug group-hover:text-heather">{a.title}</span>
                  {a.excerpt && <span className="mt-1 block max-w-[70ch] text-slate">{a.excerpt}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
