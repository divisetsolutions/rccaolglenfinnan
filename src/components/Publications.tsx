import Link from 'next/link';

interface NewsletterLike {
  title?: string;
  issueDate?: string | { seconds: number } | null;
  fileUrl?: string;
  downloadUrl?: string;
  description?: string;
}

interface HomilyLike {
  slug?: string;
  title?: string;
  excerpt?: string;
  createdAt?: string | { seconds: number } | null;
}

interface PublicationsProps {
  latestNewsletter: NewsletterLike | null;
  latestHomily: HomilyLike | null;
}

const formatDate = (value: NewsletterLike['issueDate'] | HomilyLike['createdAt']) => {
  if (!value) return null;
  let d: Date;
  if (typeof value === 'string') {
    d = new Date(value);
  } else if (typeof value === 'object' && 'seconds' in value) {
    d = new Date(value.seconds * 1000);
  } else {
    return null;
  }
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function Publications({ latestNewsletter, latestHomily }: PublicationsProps) {
  const newsletterHref =
    latestNewsletter?.downloadUrl || latestNewsletter?.fileUrl || '/newsletters';
  const homilyHref = latestHomily?.slug ? `/homilies/${latestHomily.slug}` : '/homilies';

  return (
    <section className="relative bg-ivory py-[72px] md:py-[108px]">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Section heading */}
        <div className="text-center mb-9">
          <h2 className="font-display text-navy text-[clamp(2rem,4vw,3rem)] tracking-[-0.015em] leading-[1.05]">
            This Sunday&rsquo;s Publications
          </h2>
          <p className="mt-5 font-serif italic text-stone text-[1.05rem] max-w-[520px] mx-auto">
            Each week we publish the parish newsletter and the Sunday homily.
            Read them online or download a copy to take with you.
          </p>
        </div>

        {/* Two upright pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[920px] mx-auto">
          {/* Newsletter page */}
          <PublicationPage
            eyebrow="Newsletter"
            title={latestNewsletter?.title || 'This Sunday\u2019s Newsletter'}
            date={formatDate(latestNewsletter?.issueDate)}
            description={
              latestNewsletter?.description ||
              'Mass intentions, parish notices, and the week ahead at St John\u2019s and St Mary & St Finnan.'
            }
            href={newsletterHref}
            ctaLabel={latestNewsletter ? 'Open the newsletter' : 'Browse newsletters'}
            external={Boolean(latestNewsletter?.downloadUrl || latestNewsletter?.fileUrl)}
            available={Boolean(latestNewsletter)}
          />

          {/* Homily page */}
          <PublicationPage
            eyebrow="Homily"
            title={latestHomily?.title || 'This Sunday\u2019s Homily'}
            date={formatDate(latestHomily?.createdAt)}
            description={
              latestHomily?.excerpt ||
              'A reflection on the Sunday readings from Fr Charles Egbon, MSP.'
            }
            href={homilyHref}
            ctaLabel={latestHomily ? 'Read the homily' : 'Browse homilies'}
            external={false}
            available={Boolean(latestHomily)}
          />
        </div>
      </div>
    </section>
  );
}

interface PublicationPageProps {
  eyebrow: string;
  title: string;
  date: string | null;
  description: string;
  href: string;
  ctaLabel: string;
  external: boolean;
  available: boolean;
}

function PublicationPage({
  eyebrow,
  title,
  date,
  description,
  href,
  ctaLabel,
  external,
  available,
}: PublicationPageProps) {
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Link
      href={href}
      {...linkProps}
      className="group block"
      aria-label={`${eyebrow}: ${title}`}
    >
      <article
        className="
          relative aspect-[3/4] bg-ivory-soft
          ring-1 ring-gold/45 shadow-editorial
          flex flex-col
          transition-all duration-500
          group-hover:ring-gold group-hover:-translate-y-1
        "
      >
        {/* Inner inset frame, like a printed page */}
        <div className="absolute inset-3 ring-1 ring-gold/20 pointer-events-none" />

        {/* Top: eyebrow */}
        <header className="pt-10 md:pt-12 px-8 md:px-12 text-center">
          <p className="smallcaps-lg text-gold">{eyebrow}</p>
          <div className="mt-4 mx-auto h-px w-12 bg-gold/50" />
        </header>

        {/* Middle: title + date + description */}
        <div className="flex-1 px-8 md:px-12 flex flex-col items-center justify-center text-center">
          {date && (
            <p className="smallcaps text-stone tabular-nums">{date}</p>
          )}
          <h3 className="mt-4 font-display text-navy text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.15] tracking-tight">
            {title}
          </h3>
          <div className="mt-5 mx-auto h-px w-8 bg-gold/40" />
          <p className="mt-5 font-serif text-ink/80 text-[0.98rem] leading-[1.65] max-w-[34ch]">
            {description}
          </p>
        </div>

        {/* Bottom: CTA */}
        <footer className="pb-10 md:pb-12 px-8 md:px-12 text-center">
          <span className="smallcaps text-navy nav-link inline-block group-hover:text-oxblood transition-colors">
            {ctaLabel} →
          </span>
          {!available && (
            <p className="mt-3 font-serif italic text-stone text-xs">
              Latest edition coming soon
            </p>
          )}
        </footer>
      </article>
    </Link>
  );
}
