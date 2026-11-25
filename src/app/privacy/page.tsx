import type { Metadata } from 'next';
import { shareCard, sharePhoto } from '@/lib/share';
import { PageHeader, Section } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { PARISH } from '@/lib/content';

// Wording approved by Fr Charles on 21 November 2026 (priest references made generic 25 November 2026). Change only with his approval.
export const metadata: Metadata = {
  title: 'Your privacy',
  description: 'What happens to the details you share with the parish of Caol and Glenfinnan through this website, and your rights.',
  alternates: { canonical: '/privacy' },
  openGraph: shareCard('/privacy', sharePhoto('/img/glenfinnan-exterior.jpg', 'St Mary & St Finnan above Loch Shiel')),
};

const ext = { target: '_blank', rel: 'noopener noreferrer', className: 'link' } as const;

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="border-t-2 border-line pt-8">
      <h2 className="display-md">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </Reveal>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Your privacy"
        lede="This page explains what happens to the details you share with the parish through this website. We have kept it short and plain. The Diocese's full privacy notice gives every detail."
      />
      <Section>
        <div className="max-w-[68ch] space-y-10 text-[1.08rem] leading-relaxed">
          <Part title="Who looks after your information">
            <p>
              The Parish of Caol and Glenfinnan is part of the Roman Catholic Diocese of Argyll and the Isles, a Scottish charity ({PARISH.charity}). The
              Diocese is the data controller for everything you share with the parish. Its full privacy notice is at{' '}
              <a href="https://www.rcdai.org.uk/privacy/" {...ext}>
                rcdai.org.uk/privacy
              </a>
              .
            </p>
          </Part>

          <Part title="What we collect, and why">
            <ul className="space-y-4">
              <li>
                <strong>Contact form and prayer requests:</strong> your name and email address with your message, so that the parish priest can reply and pray for
                the people you name. A name is read out or printed in the newsletter only when you tell us that we may.
              </li>
              <li>
                <strong>Wedding enquiries:</strong> your names, your contact details and the facts the priest needs to prepare a Catholic wedding, such as
                baptism, religion and any previous marriage. Because these details reveal religious belief, we ask your permission before you send them.
              </li>
              <li>
                <strong>Booked wedding dates:</strong> once a date is agreed, our Weddings page shows the date and the church, and whether it is booked or
                provisional. Names and home countries never appear.
              </li>
            </ul>
          </Part>

          <Part title="How your message reaches us">
            <p>
              Our forms are delivered by Formspree, a service based in the United States, which passes your message to the parish email account. If you
              prefer, you can simply email us at{' '}
              <a className="link" href={`mailto:${PARISH.email}`}>
                {PARISH.email}
              </a>{' '}
              instead.
            </p>
          </Part>

          <Part title="How long we keep it">
            <p>
              Messages stay in the parish email account only for as long as they are needed for the reason you sent them, and the Diocese&rsquo;s
              retention rules apply. When a wedding takes place, it is recorded in the parish marriage register, as Church law requires.
            </p>
          </Part>

          <Part title="Cookies">
            <p>
              This website sets no cookies and uses no tracking or advertising tools, so there is nothing to accept or decline. Two features load content
              from other websites: the church maps come from OpenStreetMap, and the &ldquo;From Rome&rdquo; pictures come from Vatican News. Those sites
              receive your device&rsquo;s internet address in the usual way when the map or picture loads.
            </p>
          </Part>

          <Part title="Your rights">
            <p>
              You may ask to see the information we hold about you, correct it, have it deleted or object to how we use it, and you may withdraw your
              permission at any time. Please email the parish at{' '}
              <a className="link" href={`mailto:${PARISH.email}`}>
                {PARISH.email}
              </a>
              , or the Diocesan Office at{' '}
              <a className="link" href="mailto:officeadmin@rcdai.org.uk">
                officeadmin@rcdai.org.uk
              </a>{' '}
              (<a className="link" href="tel:+441631567436">01631 567436</a>). If you remain unhappy, you may complain to the Information Commissioner&rsquo;s
              Office in Edinburgh:{' '}
              <a href="https://ico.org.uk" {...ext}>
                ico.org.uk
              </a>
              , <a className="link" href="tel:03031231115">0303 123 1115</a>.
            </p>
          </Part>

          <p className="text-[0.95rem] italic text-slate">Last updated November 2026.</p>
        </div>
      </Section>
    </>
  );
}
