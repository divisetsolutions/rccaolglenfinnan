import Image from 'next/image';
import Link from 'next/link';
import { ArchPhoto, AwayNotice, PhotoRibbon, Section, SectionHeading } from '@/components/site/Bits';
import { Parallax, Reveal } from '@/components/site/Reveal';
import { SeasonTag } from '@/components/site/SeasonTag';
import { TwoChurches } from '@/components/site/TwoChurches';
import { WeekAhead } from '@/components/site/WeekAhead';
import { CHURCHES, PARISH, RIBBON } from '@/lib/content';
import { getArticles, getNewsletters, getSchedule, longDate } from '@/lib/data';
import { formatMinutes, weeklyPattern } from '@/lib/schedule';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

const sundayTime = (items: Awaited<ReturnType<typeof getSchedule>>, church: string) => {
  const sunday = weeklyPattern(items, church).find((d) => d.weekday === 'Sunday');
  const mass = sunday?.entries.find((e) => /mass/i.test(e.title));
  return mass ? `Sunday Mass ${formatMinutes(mass.minutes)}` : 'Sunday Mass';
};

const paths = [
  { href: '/sacraments#baptism', title: 'Have a child baptised', text: 'How to arrange a baptism and what to prepare.' },
  { href: '/sacraments#marriage', title: 'Get married here', text: 'Weddings at Caol and at Glenfinnan, step by step.' },
  { href: '/sacraments#becoming-catholic', title: 'Become a Catholic', text: 'The RCIA, a gentle way in for the curious.' },
  { href: '/sacraments#funerals', title: 'Arrange a funeral', text: 'What to do when someone you love has died.' },
  { href: '/prayer-requests', title: 'Ask for prayers', text: 'Send us a name or an intention for Mass.' },
  { href: '/glenfinnan', title: 'Visit Glenfinnan', text: 'Finding the church above Loch Shiel.' },
];

export default async function Home() {
  const [schedule, homilies, news, newsletters] = await Promise.all([getSchedule(), getArticles('homily'), getArticles('news'), getNewsletters()]);
  const homily = homilies[0];
  const newsletter = newsletters[0];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="wrap grid items-center gap-10 pb-14 pt-8 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pb-24 md:pt-14">
          <div>
            <div className="fade-up">
              <SeasonTag />
            </div>
            <h1 className="display-xl mt-7">
              <span className="line-mask">
                <span style={{ animationDelay: '80ms' }}>One parish family,</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: '200ms' }}>two Highland</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: '320ms' }}>churches.</span>
              </span>
            </h1>
            <p className="lede fade-up mt-7 max-w-[46ch]" style={{ animationDelay: '520ms' }}>
              St John the Evangelist stands at the foot of Ben Nevis. St Mary &amp; St Finnan keeps watch over Loch Shiel. Whoever you are, you are
              welcome at Mass with us.
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: '660ms' }}>
              <a href="#this-week" className="btn btn-gorse">
                See this week’s Mass times
              </a>
              <Link href="/about" className="btn btn-ghost">
                Meet the parish
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 items-end gap-4 md:gap-6">
            {[
              { c: CHURCHES.caol, delay: 250, lift: 'mb-10 md:mb-20', speed: 0.05 },
              { c: CHURCHES.glenfinnan, delay: 450, lift: '', speed: -0.05 },
            ].map(({ c, delay, lift, speed }) => (
              <Parallax key={c.id} speed={speed} className={lift}>
                <Link href={c.slug} className="group block">
                  <div className="arch-rise" style={{ animationDelay: `${delay}ms` }}>
                    <ArchPhoto src={c.hero} alt={`${c.name}, ${c.place}`} className="aspect-[3/4] md:aspect-[4/5]" priority drift sizes="(max-width: 768px) 46vw, 300px" />
                  </div>
                  <p className="fade-up mt-4 font-display text-[1.25rem] font-semibold leading-tight md:text-[1.5rem]" style={{ animationDelay: `${delay + 600}ms` }}>
                    {c.short}
                    <span className="block text-[0.95rem] font-normal text-slate [font-family:var(--font-body)]">{c.place}</span>
                    <span className="mt-1 block text-[0.95rem] font-bold text-heather [font-family:var(--font-body)] group-hover:underline">{sundayTime(schedule, c.id)}</span>
                  </p>
                </Link>
              </Parallax>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- This week ---------- */}
      <section id="this-week" className="scroll-mt-24 bg-mist-2 py-14 md:py-20">
        <div className="wrap">
          <SectionHeading title="This week in the parish" lede="Kept up to date from the parish office, so what you see here is what is happening." />
          <AwayNotice className="mb-6" />
          <WeekAhead items={schedule} />
        </div>
      </section>

      {/* ---------- Welcome letter ---------- */}
      <Section tone="white">
        <div className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal image className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[2rem] md:sticky md:top-28">
            <Image src="/img/fr-charles.jpg" alt="Fr Charles Egbon in green vestments above Loch Shiel" fill sizes="(max-width: 768px) 90vw, 380px" className="object-cover object-[62%_center]" />
          </Reveal>
          <Reveal>
            <h2 className="display-lg font-display italic">Dear friends,</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-[1.14rem] leading-[1.75]">
              <p>
                A very warm welcome to our two churches. Whether you have worshipped here all your life, or you have wandered in off the road and are
                not quite sure what brought you, I am glad you have found us.
              </p>
              <p>
                We are one parish family with two homes. St John’s in Caol sits among the houses where most of us live and work. St Mary &amp; St
                Finnan in Glenfinnan looks down the length of Loch Shiel, and visitors come to it from every corner of the world. The two could
                hardly be more different, and it is the same Mass and the same welcome at both.
              </p>
              <p>
                If you are new here, or coming back after a long time away, please do not stand at the door wondering. Come in and sit where you
                like. Ask me anything. This is our home, and it can be your home too.
              </p>
            </div>
            <p className="mt-8 font-display text-[1.7rem] italic">With joy in Christ,</p>
            <p className="mt-1 font-bold">{PARISH.priest}</p>
            <p className="text-slate">Parish Priest</p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Two churches (scroll story) ---------- */}
      <TwoChurches />

      {/* ---------- I would like to... ---------- */}
      <Section>
        <SectionHeading title="What brings you here?" lede="The parish is for the whole of life. Start with whatever you need today." />
        <ul className="grid gap-x-10 md:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal as="li" key={p.href} delay={(i % 2) * 90}>
              <Link href={p.href} className="group flex items-center justify-between gap-6 border-t-2 border-line py-6 transition-colors hover:border-heather">
                <span>
                  <span className="block font-display text-[1.7rem] font-semibold leading-tight transition-colors group-hover:text-heather md:text-[2rem]">{p.title}</span>
                  <span className="mt-1 block text-slate">{p.text}</span>
                </span>
                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mist-2 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gorse">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------- Word for the week ---------- */}
      <Section tone="heather">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col rounded-[2rem] bg-white p-8 shadow-soft md:p-10">
            <p className="font-bold text-heather">Sunday homily</p>
            <h3 className="display-md mt-3">{homily ? homily.title : 'The Sunday homily'}</h3>
            <p className="mt-4 flex-grow text-slate">
              {homily?.excerpt || 'Fr Charles’s reflection on the Sunday readings, to read again during the week.'}
            </p>
            <Link href={homily ? `/homilies/${homily.id}` : '/homilies'} className="btn btn-loch mt-7 self-start">
              {homily ? 'Read the homily' : 'Browse homilies'}
            </Link>
          </Reveal>
          <Reveal delay={120} className="flex flex-col rounded-[2rem] bg-loch p-8 text-mist shadow-soft md:p-10">
            <p className="font-bold text-gorse">Parish newsletter</p>
            <h3 className="display-md mt-3">{newsletter ? newsletter.title : 'This week’s newsletter'}</h3>
            <p className="mt-4 flex-grow text-mist/75">
              {newsletter?.date ? `Published ${longDate(newsletter.date)}. ` : ''}Notices, anniversaries and the week ahead at both churches.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {newsletter?.fileUrl && (
                <a href={newsletter.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gorse">
                  Open the newsletter
                </a>
              )}
              <Link href="/newsletters" className="btn btn-ghost-light">
                All newsletters
              </Link>
            </div>
          </Reveal>
        </div>

        {news.length > 0 && (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="display-md">Parish news</h2>
              <Link href="/news" className="link">
                All news
              </Link>
            </div>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {news.slice(0, 3).map((a, i) => (
                <Reveal as="li" key={a.id} delay={i * 90}>
                  <Link href={`/news/${a.id}`} className="group block">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-mist-2">
                      <Image src={a.featuredImageUrl || '/img/loch.jpg'} alt="" fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-4 text-[0.92rem] text-slate">{longDate(a.date)}</p>
                    <h3 className="mt-1 font-display text-[1.45rem] font-semibold leading-snug group-hover:text-heather">{a.title}</h3>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <PhotoRibbon photos={RIBBON} />

      {/* ---------- Closing invitation ---------- */}
      <section className="bg-mist pb-20 pt-6 md:pb-28">
        <Reveal className="wrap text-center">
          <h2 className="display-lg mx-auto max-w-[18ch]">Come in and sit where you like.</h2>
          <p className="lede mx-auto mt-5 max-w-[48ch]">The door is open and there is a place for you this Sunday.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/calendar" className="btn btn-loch">
              Mass times
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
