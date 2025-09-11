import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the history, community, and life of the parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

export default function AboutPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          About Our Parishes
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Information about the history, community, and life of our two parishes will be added here soon.
        </p>
      </div>
    </section>
  );
}
