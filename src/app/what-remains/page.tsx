import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { BOOK, BOOK_PRAISE, CHRISTMAS_LAST_ORDER, bookHeadline, christmasOrderState, isChristmasSeason } from '@/lib/book';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'What Remains, a book by Fr Charles Egbon',
  description:
    'What Remains: Faith at the Edge of Scotland. A book for parents and grandparents who pray for children who no longer come to Mass, written in Glenfinnan by Fr Charles Egbon. A thoughtful Christmas gift.',
  alternates: { canonical: '/what-remains' },
  openGraph: { images: [{ url: BOOK.cover, width: 599, height: 945, alt: BOOK.coverAlt }] },
};

const OrderButton = ({ className = 'btn-gorse' }: { className?: string }) => (
  <a href={BOOK.order} target="_blank" rel="noopener noreferrer" className={`btn ${className}`}>
    Order a copy for {BOOK.price}
  </a>
);

export default function BookPage() {
  const christmas = isChristmasSeason();
  const orderState = christmasOrderState();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: BOOK.title,
    alternativeHeadline: BOOK.subtitle,
    author: { '@type': 'Person', name: 'Fr Charles Egbon' },
    isbn: '9781919325231',
    numberOfPages: 115,
    bookFormat: 'https://schema.org/Paperback',
    publisher: { '@type': 'Organization', name: BOOK.publisher },
    url: BOOK.about,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-loch text-mist">
        <div aria-hidden className="absolute -right-24 top-10 hidden h-[130%] w-80 rounded-t-full border-[22px] border-mist/[0.04] md:block" />
        <div className="wrap relative grid items-center gap-10 pb-16 pt-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pb-24 md:pt-20">
          <div>
            <p className="fade-up font-bold text-gorse">
              {BOOK.title}: {BOOK.subtitle}
            </p>
            <h1 className="display-lg mt-4 max-w-[17ch]">
              <span className="line-mask">
                <span>{bookHeadline(christmas)}</span>
              </span>
            </h1>
            <p className="fade-up mt-6 max-w-[52ch] text-[1.2rem] leading-relaxed text-mist/80" style={{ animationDelay: '250ms' }}>
              Fr Charles wrote this book in Glenfinnan for the parents and grandparents who keep the faith, and keep praying for children who no longer come to
              Mass.
            </p>
            <div className="fade-up mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ animationDelay: '400ms' }}>
              <OrderButton />
              <span className="text-mist/75">{BOOK.format}. Posted from the UK.</span>
            </div>
          </div>
          <div className="fade-up mx-auto w-[230px] md:w-[330px]" style={{ animationDelay: '150ms' }}>
            <Image src={BOOK.cover} alt={BOOK.coverAlt} width={599} height={945} priority sizes="(max-width: 768px) 230px, 330px" className="h-auto w-full drop-shadow-[0_34px_34px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </section>

      {/* ---------- Who it is for ---------- */}
      <Section tone="white">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="display-lg">Who it is for</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-[1.14rem] leading-[1.75]">
              <p>
                You probably know someone like this. They are at Mass every Sunday, and their children and grandchildren are not. They say little about it. They light
                a candle and say the names.
              </p>
              <p>
                What Remains is for them. In twenty-three short chapters Fr Charles tells the stories of people like them in the parishes of Lochaber, and of the love
                that goes on praying when the pews around it have emptied.
              </p>
              <p>
                People who have read it say it gave them comfort, and that they saw themselves in its stories. It is short enough to read a chapter at a time, and
                the church on the cover is our own St Mary &amp; St Finnan.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="self-start rounded-[2rem] bg-heather-soft p-7 md:sticky md:top-28 md:p-9">
            <h2 className="display-md">{christmas ? 'Ordering for Christmas' : 'How to order'}</h2>
            <ul className="mt-5 space-y-4 leading-relaxed">
              <li>
                <span className="font-bold">{BOOK.price} plus postage.</span> You order online, and the payment is handled securely by Payhip.
              </li>
              <li>
                <span className="font-bold">Posted to any address.</span> Each copy is printed to order in the UK. Have it sent to your own door, or straight to the
                person it is for.
              </li>
              {christmas && (
                <li>
                  {orderState === 'before' ? (
                    <>
                      <span className="font-bold">Order by {CHRISTMAS_LAST_ORDER.label}</span> for delivery in the UK before Christmas. For addresses outside the UK,
                      please order sooner.
                    </>
                  ) : orderState === 'after' ? (
                    <>
                      <span className="font-bold">Ordering now?</span> The last date for delivery before Christmas has passed, so your copy may arrive after Christmas
                      Day.
                    </>
                  ) : (
                    <>
                      <span className="font-bold">Please order early.</span> Printing and the Christmas post both take time.
                    </>
                  )}
                </li>
              )}
              <li>
                <span className="font-bold">Prefer Amazon?</span> The paperback and the Kindle edition are{' '}
                <a href={BOOK.amazon} target="_blank" rel="noopener noreferrer" className="link">
                  on Amazon
                </a>{' '}
                as well.
              </li>
            </ul>
            <div className="mt-7">
              <OrderButton className="btn-loch" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Readers ---------- */}
      <Section tone="mist">
        <Reveal>
          <h2 className="display-lg">What readers have said</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BOOK_PRAISE.map((p, i) => (
            <Reveal key={p.source} delay={(i % 2) * 100}>
              <figure className="flex h-full flex-col rounded-[2rem] bg-white p-7 shadow-soft md:p-9">
                <blockquote className="flex-grow font-display text-[1.32rem] italic leading-[1.5]">{p.quote}</blockquote>
                <figcaption className="mt-5 border-t-2 border-line pt-4 font-bold text-heather">{p.source}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Closing ---------- */}
      <section className="bg-loch py-16 text-mist md:py-20">
        <Reveal className="wrap text-center">
          <h2 className="display-lg mx-auto max-w-[20ch]">{christmas ? 'Put it under the tree for someone who never stops praying.' : 'Give it to someone who never stops praying.'}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <OrderButton />
            <a href={BOOK.about} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              Read more about the book
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-[60ch] text-[0.95rem] text-mist/65">
            What Remains is Fr Charles’s own work, published and sold by {BOOK.publisher}. It is not sold by the parish.
          </p>
        </Reveal>
      </section>
    </>
  );
}
