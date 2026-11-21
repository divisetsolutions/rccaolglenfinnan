import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader, Section } from '@/components/site/Bits';
import { ContactForm } from '@/components/site/ContactForm';
import { Reveal } from '@/components/site/Reveal';

export const metadata: Metadata = {
  title: 'Ask for prayers',
  description: 'Ask the parish of Caol and Glenfinnan to pray for you or for someone you love, or request a Mass intention.',
  alternates: { canonical: '/prayer-requests' },
};

export default function PrayerRequestsPage() {
  return (
    <>
      <PageHeader title="Ask for prayers" lede="Tell us who or what you would like us to pray for. You may also ask for a Mass to be offered for someone, living or departed." image="/img/glenfinnan-lady-chapel.jpg" />
      <Section>
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <Suspense fallback={null}>
              <ContactForm prayer />
            </Suspense>
          </Reveal>
          <Reveal delay={120} className="self-start rounded-[2rem] bg-heather-soft p-8">
            <h2 className="display-md text-heather">How we use your request</h2>
            <p className="mt-4">Your message goes to the parish office. Please say whether the name may be read out or printed in the newsletter, or should be kept private.</p>
            <p className="mt-4">Names of the sick and of those who have died are remembered at Mass in both churches.</p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
