import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArchPhoto, PageHeader, Section, SectionHeading } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { CHURCHES, PARISH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our parish',
  description: 'The story and life of the Catholic parish of Caol and Glenfinnan: two churches in the West Highlands, one parish family.',
  alternates: { canonical: '/about' },
};

const mission = [
  { title: 'We worship', text: 'The Mass and the sacraments are the heart of everything we do, celebrated with reverence and with joy.' },
  { title: 'We welcome', text: 'Everyone who comes through the door is valued, whether for one Sunday on holiday or for a lifetime.' },
  { title: 'We serve', text: 'We look after the sick and the housebound, and we reach out to those in need at home and overseas.' },
  { title: 'We hand on the faith', text: 'Children, couples and adult enquirers are prepared for the sacraments and helped to know Christ.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Our parish"
        lede="A Catholic community in Lochaber, in the Diocese of Argyll and the Isles. One priest, two churches, and a people who look out for one another."
        image="/img/loch.jpg"
        imageAlt="Still water and pine woods in the West Highlands"
      />

      <Section tone="white">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="display-lg">A parish between the mountain and the loch</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-[1.12rem] leading-[1.75]">
              <p>
                Our parish stretches from the shore of Loch Linnhe at Caol, beside Fort William, out along the Road to the Isles to Glenfinnan. The
                faith has been kept in these glens for many centuries, and it is alive here still.
              </p>
              <p>
                Most parishioners live in and around Caol, where St John’s is the everyday home of the parish. Glenfinnan is smaller and quieter, a
                scattered Highland community whose church is known and loved far beyond Scotland.
              </p>
              <p>
                We belong to the Diocese of Argyll and the Isles, whose cathedral is in Oban. Our parish priest is {PARISH.priest}, a member of the
                Missionary Society of St Paul.
              </p>
            </div>
          </Reveal>
          <Reveal image className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src="/img/glenfinnan-prayer.jpg" alt="Parishioners at prayer in St Mary & St Finnan" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading title="What we are here for" />
        <ul className="grid gap-x-12 md:grid-cols-2">
          {mission.map((m, i) => (
            <Reveal as="li" key={m.title} delay={(i % 2) * 100} className="border-t-2 border-line py-7">
              <h3 className="display-md">{m.title}</h3>
              <p className="mt-2 max-w-[48ch] text-[1.08rem] text-slate">{m.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="loch">
        <SectionHeading title="The two churches" className="[&_h2]:text-mist" />
        <div className="grid gap-10 md:grid-cols-2">
          {Object.values(CHURCHES).map((c, i) => (
            <Reveal key={c.id} delay={i * 140}>
              <Link href={c.slug} className="group grid grid-cols-[130px_1fr] items-center gap-6 md:grid-cols-[180px_1fr]">
                <ArchPhoto src={c.hero} alt={`${c.name}, ${c.place}`} className="aspect-[3/4]" sizes="180px" />
                <span>
                  <span className="block text-gorse">{c.setting}</span>
                  <span className="mt-1 block font-display text-[1.7rem] font-semibold leading-tight group-hover:underline md:text-[2rem]">{c.name}</span>
                  <span className="mt-3 block text-mist/75">{c.summary}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
