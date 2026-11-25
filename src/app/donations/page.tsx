import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { PageHeader, Section } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { CHURCHES, PARISH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Giving',
  description: 'Give to St Mary & St Finnan, Glenfinnan or St John the Evangelist, Caol. Each church keeps its own account, and every gift goes to the church you choose.',
  alternates: { canonical: '/donations' },
  openGraph: shareCard('/donations', sharePhoto('/img/glenfinnan-nave.jpg', 'The tartan aisle carpet leading to the altar at Glenfinnan')),
};

const ways: { title: string; text: string }[] = [
  { title: 'Give at Mass', text: 'The offertory collection at Sunday Mass keeps both churches open, heated and cared for. Envelopes are available in the porch.' },
  { title: 'Give regularly', text: 'A regular gift helps us plan for the year. Press Give to St Mary & St Finnan or Give to St John’s above, choose your amount, then choose Weekly or Monthly. You will be asked to create a free MyGivingHub account, so you can change or stop your gift at any time. If you pay UK tax, tick Gift Aid, and the church receives an extra 25p for every £1, at no cost to you. Questions: email caol@rcdai.org.uk.' },
];

export default function GivingPage() {
  return (
    <>
      <PageHeader title="Giving to the parish" lede="Our two churches keep separate accounts and each has its own needs. Choose the church you would like to help, and your gift goes to that church alone." image="/img/caol-altar.jpg" />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {[CHURCHES.glenfinnan, CHURCHES.caol].map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 110} className="flex flex-col rounded-[2rem] bg-loch p-8 text-mist shadow-lift md:p-10">
              <h2 className="display-md">
                {c.name}, {c.id === 'caol' ? 'Caol' : 'Glenfinnan'}
              </h2>
              <p className="mt-4 flex-grow text-mist/80">{c.giveText}</p>
              <a href={c.give} target="_blank" rel="noopener noreferrer" className="btn btn-gorse mt-7 self-start">
                Give to {c.short}
              </a>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 max-w-[70ch] text-[1.1rem]">
          Every gift is used only for the church you choose. The parish finance council, with members from both churches, looks after each account.
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {ways.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 110} className="flex flex-col rounded-[2rem] bg-white p-8 shadow-soft">
              <h2 className="display-md">{w.title}</h2>
              <p className="mt-4 flex-grow text-slate">{w.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 max-w-[70ch] text-slate">
          Visitors from the United States can make a tax-deductible gift through the{' '}
          <a className="link" href={PARISH.dioceseDonate} target="_blank" rel="noopener noreferrer">diocese’s donation page</a>. The Roman Catholic Diocese of Argyll and
          the Isles is a registered Scottish charity, {PARISH.charity}. Questions about giving: <a className="link" href={`mailto:${PARISH.email}`}>{PARISH.email}</a>.
        </p>
      </Section>
    </>
  );
}
