import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArchPhoto,
  PageHeader,
  PhotoRibbon,
  Section,
  SectionHeading,
} from "@/components/site/Bits";
import { PathFinder } from "@/components/site/PathFinder";
import { Reveal } from "@/components/site/Reveal";
import { WeddingEnquiryForm } from "@/components/site/WeddingEnquiryForm";
import { CHURCHES, PARISH, focus } from "@/lib/content";
import { easter } from "@/lib/liturgy";
import {
  REGISTRAR,
  WEDDING_FAQ,
  WEDDING_PHOTOS,
  WEDDING_STEPS,
} from "@/lib/weddings";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Getting married at Glenfinnan",
  description:
    "How to be married at St Mary & St Finnan, Glenfinnan, the Catholic church above Loch Shiel: who can marry here, the papers you need, the Scottish civil forms, and how to send an enquiry.",
  alternates: { canonical: "/weddings" },
  openGraph: { images: [{ url: "/img/weddings/glenfinnan-church-wedding-bride-groom-altar.jpg", width: 1280, height: 720, alt: "A wedding at St Mary & St Finnan, Glenfinnan" }] },
};

const DAY = 86400000;
const day = (ms: number) =>
  new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });

/** Lent for the next two years that have not yet passed. */
function comingLents() {
  const now = Date.now();
  const thisYear = new Date(now).getUTCFullYear();
  return [thisYear, thisYear + 1, thisYear + 2]
    .map((y) => ({ year: y, easter: easter(y) }))
    .filter((x) => x.easter > now)
    .slice(0, 2)
    .map((x) => ({
      year: x.year,
      from: day(x.easter - 46 * DAY),
      holyWeek: day(x.easter - 7 * DAY),
      easter: day(x.easter),
    }));
}

export default function WeddingsPage() {
  const g = CHURCHES.glenfinnan;
  const lents = comingLents();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WEDDING_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <PageHeader
        title="Getting married at Glenfinnan"
        lede="Couples come from all over the world to make their vows in the church above Loch Shiel. This page tells you whether you can marry here, what you will need, and how to begin."
        image="/img/weddings/glenfinnan-church-wedding-sanctuary-rose-window.jpg"
        imageAlt="The sanctuary of St Mary & St Finnan, Glenfinnan, prepared for a wedding, with two chairs for the couple below the rose window"
      >
        <a href="#your-path" className="btn btn-gorse">
          Find your path
        </a>
        <a href="#enquire" className="btn btn-ghost-light">
          Send an enquiry
        </a>
      </PageHeader>

      {/* ---------- The place, and what a wedding here is ---------- */}
      <Section tone="white">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="display-lg">
              A sacrament in a place people never forget
            </h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-[1.14rem] leading-[1.75]">
              <p>
                Congratulations on your engagement. We are glad you are thinking
                of Glenfinnan.
              </p>
              <p>
                St Mary &amp; St Finnan stands on a rise above Loch Shiel, with
                the hills of Moidart behind it. Edward Welby Pugin designed it
                and it was completed in 1873. You walk to the altar along an
                aisle laid with tartan, under stone arches and a rose window.
              </p>
              <p>
                It is a parish church before it is anything else, and a wedding
                here is a sacrament of the Catholic Church. That is why we ask
                for some preparation and some paperwork. None of it is difficult
                when you start early, and we will guide you through it.
              </p>
              <p>
                Couples are also married at{" "}
                <Link href="/caol" className="link">
                  St John’s in Caol
                </Link>
                . Everything on this page applies there too.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 items-end gap-4 md:gap-6">
            <Reveal image className="mb-10 md:mb-16">
              <ArchPhoto
                src="/img/glenfinnan-exterior.jpg"
                alt="St Mary & St Finnan above Loch Shiel"
                className="aspect-[3/4]"
                sizes="(max-width: 768px) 45vw, 260px"
              />
            </Reveal>
            <Reveal image delay={140}>
              <ArchPhoto
                src="/img/glenfinnan-interior.jpg"
                alt="Stone arches and the rose window inside the church"
                className="aspect-[3/4]"
                sizes="(max-width: 768px) 45vw, 260px"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {WEDDING_PHOTOS.length >= 4 && <PhotoRibbon photos={WEDDING_PHOTOS} />}
      {WEDDING_PHOTOS.length > 0 && WEDDING_PHOTOS.length < 4 && (
        <section className="bg-white pb-16 md:pb-24">
          <div className="wrap grid items-start gap-6 md:grid-cols-[1.25fr_1fr] md:gap-8">
            {WEDDING_PHOTOS.map((p, i) => (
              <Reveal as="div" image key={p.src} delay={i * 140} className={i % 2 ? 'md:mt-20' : ''}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-mist-2">
                    <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 640px" style={focus(p.src)} className="object-cover" />
                  </div>
                  <figcaption className="mt-3 font-display text-[1.2rem] italic text-slate">{p.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Path finder ---------- */}
      <section id="your-path" className="scroll-mt-24 bg-mist py-16 md:py-24">
        <div className="wrap">
          <SectionHeading
            title="Can we marry here?"
            lede="Answer two questions and see what your own situation asks of you. Nothing is sent to us."
          />
          <PathFinder />
        </div>
      </section>

      {/* ---------- The walk to the altar ---------- */}
      <Section tone="white">
        <SectionHeading
          title="From first letter to wedding day"
          lede="The order things happen in, and when. The Church’s side comes first, then the registrar’s."
        />
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div>
            <ol className="relative max-w-[820px]">
              <span
                aria-hidden
                className="tartan-aisle absolute bottom-3 left-0 top-3 md:left-[13.5rem]"
              />
              {WEDDING_STEPS.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={(i % 3) * 60}
                  className="relative grid gap-x-12 gap-y-1 pb-10 pl-9 last:pb-0 md:grid-cols-[12rem_1fr] md:pl-0"
                >
                  <p className="font-bold text-heather md:pt-1 md:text-right">
                    {s.when}
                  </p>
                  <div className="md:pl-6">
                    <h3 className="font-display text-[1.6rem] font-semibold leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[56ch] text-[1.08rem] leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-12 max-w-[820px] rounded-[2rem] bg-heather-soft p-7 md:p-9">
              <h3 className="display-md">The registrar</h3>
              <p className="mt-3 max-w-[60ch] leading-relaxed">
                The Marriage Notice forms and the list of documents to send with
                them are on the National Records of Scotland website. Glenfinnan
                and Caol are both served by the {REGISTRAR.name}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={REGISTRAR.guide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-loch"
                >
                  Forms and guidance
                </a>
                <a href={REGISTRAR.href} className="btn btn-ghost">
                  Ring the registrar on {REGISTRAR.phone}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal image className="hidden lg:sticky lg:top-32 lg:block">
            <ArchPhoto
              src="/img/glenfinnan-autumn.jpg"
              alt="St Mary & St Finnan in autumn, with the hills of Loch Shiel behind"
              className="aspect-[3/4]"
              sizes="280px"
            />
            <p className="mt-4 text-center font-display text-[1.25rem] italic text-slate">
              {g.name}, {g.place}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Choosing a day ---------- */}
      <Section tone="loch">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <h2 className="display-lg">Choosing your day</h2>
            <p className="mt-5 max-w-[46ch] text-[1.14rem] leading-relaxed text-mist/80">
              The Church keeps her own calendar, and some days are not open for
              weddings. Offer us two or three dates and we will tell you which
              are free.
            </p>
            {lents.length > 0 && (
              <dl className="mt-8 space-y-4">
                {lents.map((l) => (
                  <div key={l.year} className="rounded-2xl bg-mist/[0.07] p-5">
                    <dt className="font-display text-[1.5rem] font-semibold text-gorse">
                      {l.year}
                    </dt>
                    <dd className="mt-1 text-mist/90">
                      Lent runs from {l.from}. Holy Week begins on {l.holyWeek},
                      and Easter Sunday is {l.easter}.
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-mist/15 border-y border-mist/15 text-[1.1rem]">
              {[
                [
                  "Holy Week",
                  "There are no weddings in the week before Easter.",
                ],
                [
                  "Lent",
                  "We ask couples to choose a day outside the forty days of Lent.",
                ],
                [
                  "Sundays and great feasts",
                  "The Mass of the day comes first, so most weddings are on a weekday or a Saturday.",
                ],
                [
                  "Your date",
                  "A date is settled only when Fr Charles has agreed it with you. Please hold off booking a reception or travel until then.",
                ],
              ].map(([t, d]) => (
                <li
                  key={t}
                  className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <span className="font-bold text-gorse">{t}</span>
                  <span className="leading-relaxed text-mist/90">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Questions ---------- */}
      <Section>
        <div className="grid items-start gap-x-16 lg:grid-cols-[0.6fr_1.4fr]">
          <SectionHeading
            title="Questions couples ask"
            className="lg:sticky lg:top-32"
          />
          <div>
            {WEDDING_FAQ.map((f) => (
              <details
                key={f.q}
                className="group border-t-2 border-line last:border-b-2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.4rem] font-semibold leading-snug hover:text-heather [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist-2 text-[1.4rem] font-normal transition-transform duration-300 group-open:rotate-45 group-open:bg-gorse"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-[1.1rem] leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Enquiry ---------- */}
      <section
        id="enquire"
        className="scroll-mt-24 bg-heather-soft py-16 md:py-24"
      >
        <div className="wrap">
          <SectionHeading
            title="Send your enquiry"
            lede="A few facts about the two of you let Fr Charles give you the right answer the first time. If you would rather write, the address is below."
          />
          <WeddingEnquiryForm />
          <p className="mt-8 text-slate">
            Or email{" "}
            <a className="link" href={`mailto:${g.email}`}>
              {g.email}
            </a>{" "}
            or ring {PARISH.phone}. Finding the church:{" "}
            <Link href="/glenfinnan" className="link">
              visiting Glenfinnan
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
