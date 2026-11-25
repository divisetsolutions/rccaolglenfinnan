import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { PageHeader, Section } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';

export const metadata: Metadata = {
  title: 'Safeguarding',
  description: 'Safeguarding in the parish of Caol and Glenfinnan and the Diocese of Argyll and the Isles, and who to contact with a concern.',
  alternates: { canonical: '/safeguarding' },
  openGraph: shareCard('/safeguarding', sharePhoto('/img/caol-exterior.jpg', 'St John the Evangelist, Caol')),
};

export default function SafeguardingPage() {
  return (
    <>
      <PageHeader title="Safeguarding" lede="Every child and every vulnerable adult must be safe in the Church. The parish follows the safeguarding standards of the Catholic Church in Scotland." />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-loch p-8 text-mist md:p-10">
            <h2 className="display-md">If someone is in immediate danger</h2>
            <p className="mt-4 font-display text-[2.4rem] leading-none text-gorse">Call 999</p>
            <p className="mt-4 text-mist/80">For a concern that is not an emergency, contact Police Scotland on 101, or the diocesan safeguarding adviser.</p>
          </Reveal>
          <Reveal delay={120} className="rounded-[2rem] bg-white p-8 shadow-soft md:p-10">
            <h2 className="display-md">Diocesan Safeguarding Adviser</h2>
            <address className="mt-4 not-italic leading-relaxed">
              Rev Dr Tony Livesey
              <br />
              Diocesan Office, Esplanade, Oban, PA34 5AB
              <br />
              <a className="link" href="tel:+447938253133">07938 253133</a>
              <br />
              <a className="link" href="mailto:safeguardingadvisor@rcdai.org.uk">safeguardingadvisor@rcdai.org.uk</a>
            </address>
            <p className="mt-5">
              <a className="link" href="https://www.rcdai.org.uk/safeguarding/safeguarding-in-our-parishes/" target="_blank" rel="noopener noreferrer">
                Safeguarding on the diocese website
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-10 max-w-[68ch] text-[1.08rem]">
          <p>You can speak to the parish priest or to the parish safeguarding coordinator in confidence at any time. Anyone who works with children or vulnerable adults in the parish is checked and trained before they begin.</p>
        </Reveal>
      </Section>
    </>
  );
}
