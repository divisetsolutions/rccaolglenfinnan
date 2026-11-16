import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { PARISH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Giving',
  description: 'How to support the Catholic parish of Caol and Glenfinnan through the Diocese of Argyll and the Isles.',
  alternates: { canonical: '/donations' },
};

const ways = [
  { title: 'Give online', text: 'Online gifts for every parish in the diocese are received by the Diocese of Argyll and the Isles and passed on to the parish you name. Please say that your gift is for Caol and Glenfinnan.', action: { href: PARISH.dioceseDonate, label: 'Give through the diocese' } },
  { title: 'Give at Mass', text: 'The offertory collection at Sunday Mass keeps both churches open, heated and cared for. Envelopes are available in the porch.' },
  { title: 'Standing order and Gift Aid', text: 'A regular gift helps the parish to plan. If you pay UK tax, Gift Aid adds a quarter to what you give at no cost to you. Ask the parish office for the forms.' },
];

export default function GivingPage() {
  return (
    <>
      <PageHeader title="Giving to the parish" lede="Two churches in a small Highland community are kept going by the generosity of parishioners and visitors. Thank you." image="/img/caol-altar.jpg" />
      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {ways.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 110} className={`flex flex-col rounded-[2rem] p-8 ${i === 0 ? 'bg-loch text-mist shadow-lift' : 'bg-white shadow-soft'}`}>
              <h2 className="display-md">{w.title}</h2>
              <p className={`mt-4 flex-grow ${i === 0 ? 'text-mist/80' : 'text-slate'}`}>{w.text}</p>
              {w.action && (
                <a href={w.action.href} target="_blank" rel="noopener noreferrer" className="btn btn-gorse mt-7 self-start">
                  {w.action.label}
                </a>
              )}
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 max-w-[70ch] text-slate">
          Visitors from the United States can make a tax-deductible gift through the diocese’s page as well. The Roman Catholic Diocese of Argyll and
          the Isles is a registered Scottish charity, {PARISH.charity}. Questions about giving: <a className="link" href={`mailto:${PARISH.email}`}>{PARISH.email}</a>.
        </p>
      </Section>
    </>
  );
}
