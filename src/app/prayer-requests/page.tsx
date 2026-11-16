import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Prayer Requests',
  description: 'Ask the parish of Caol and Glenfinnan to pray for you or for someone you love.',
};

export default function PrayerRequestsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[700px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Prayer Requests
        </h1>
        <p className="text-lg text-muted-foreground">
          Our parish community is glad to pray for you and for those you love.
        </p>
        <p>
          To ask for prayers, or to request a Mass intention, please write to the parish at{' '}
          <a className="underline" href="mailto:caol@rcdai.org.uk">caol@rcdai.org.uk</a>, use the{' '}
          <Link className="underline" href="/contact">contact form</Link>, or speak to Fr Charles
          after Mass. Please tell us whether you would like the intention kept private.
        </p>
      </div>
    </section>
  );
}
