import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { PageHeader, Section } from '@/components/site/Bits';
import { ContactForm } from '@/components/site/ContactForm';
import { Reveal } from '@/components/site/Reveal';
import { CHURCHES, PARISH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the Catholic parish of Caol and Glenfinnan: phone, email, addresses and a message form.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact the parish" lede="Ring, write or send a message. For someone who is dying or seriously ill, please telephone." />
      <Section>
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="display-md mb-6">Send a message</h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <Reveal delay={120} className="space-y-6">
            <div className="rounded-[2rem] bg-loch p-7 text-mist md:p-9">
              <p className="font-bold text-gorse">Parish office</p>
              <p className="mt-3 font-display text-[2.2rem] leading-none">
                <a href={PARISH.phoneHref}>{PARISH.phone}</a>
              </p>
              <p className="mt-3">
                <a className="underline decoration-gorse underline-offset-4" href={`mailto:${PARISH.email}`}>
                  {PARISH.email}
                </a>
              </p>
              <p className="mt-4 text-mist/75">{PARISH.priest}, Parish Priest</p>
            </div>
            {Object.values(CHURCHES).map((c) => (
              <address key={c.id} className="rounded-[2rem] bg-white p-7 not-italic shadow-soft">
                <p className="font-display text-[1.4rem] font-semibold">{c.name}</p>
                <p className="mt-2 text-slate">{c.address.join(', ')}</p>
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  <a className="link" href={c.map} target="_blank" rel="noopener noreferrer">
                    Directions
                  </a>
                  <Link className="link" href={c.slug}>
                    About this church
                  </Link>
                </p>
              </address>
            ))}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
