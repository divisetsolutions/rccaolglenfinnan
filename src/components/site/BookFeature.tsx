import Image from 'next/image';
import Link from 'next/link';
import { BOOK, bookHeadline, isChristmasSeason } from '@/lib/book';
import { Reveal } from './Reveal';

/** The panel that introduces Fr Charles's book on the homepage and the homilies page. */
export function BookFeature() {
  const christmas = isChristmasSeason();
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="wrap grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal image className="mx-auto w-[200px] md:w-[280px]">
          <Link href="/what-remains" aria-label={`${BOOK.title}, the book by Fr Charles`}>
            <Image src={BOOK.cover} alt={BOOK.coverAlt} width={599} height={945} sizes="280px" className="h-auto w-full drop-shadow-[0_28px_30px_rgba(10,35,45,0.28)] transition-transform duration-500 hover:-translate-y-1.5" />
          </Link>
        </Reveal>
        <Reveal>
          <p className="font-bold text-heather">
            {BOOK.title}, by {BOOK.author}
          </p>
          <h2 className="display-lg mt-3 max-w-[20ch]">{bookHeadline(christmas)}</h2>
          <p className="lede mt-5 max-w-[54ch]">
            Written in Glenfinnan for the parents and grandparents who keep the faith, and keep praying for children who no longer come to Mass. Readers say they
            found comfort in it, and saw themselves in its pages.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/what-remains" className="btn btn-gorse">
              {christmas ? 'See the book and order for Christmas' : 'See the book'}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
