import { HeroCarousel } from "@/components/HeroCarousel";
import NextService from "@/components/NextService";
import NewsHighlights from "@/components/NewsHighlights";
import { WelcomeSection } from "@/components/WelcomeSection";
import { getLatestNewsletter, getLatestHomily } from "@/lib/firebase";
import { Metadata } from 'next';
import { InfoCards } from "@/components/InfoCards";

export const metadata: Metadata = {
  title: 'St John the Evangelist, Caol & St Mary & St Finnan, Glenfinnan',
  description: 'The primary digital hub for the Roman Catholic parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan, providing Mass times, news, sacraments information, and contact details.',
};

export default async function Home() {
  const latestNewsletter = await getLatestNewsletter();
  const latestHomily = await getLatestHomily();

  // Serialize the date objects to be passed to the client component
  const serializableNewsletter = latestNewsletter ? {
    ...latestNewsletter,
    createdAt: (latestNewsletter.createdAt && typeof latestNewsletter.createdAt.toDate === 'function') ? latestNewsletter.createdAt.toDate().toISOString() : latestNewsletter.createdAt ?? null,
    updatedAt: (latestNewsletter.updatedAt && typeof latestNewsletter.updatedAt.toDate === 'function') ? latestNewsletter.updatedAt.toDate().toISOString() : latestNewsletter.updatedAt ?? null,
  } : null;

  const serializableHomily = latestHomily ? {
    ...latestHomily,
    createdAt: (latestHomily.createdAt && typeof latestHomily.createdAt.toDate === 'function') ? latestHomily.createdAt.toDate().toISOString() : latestHomily.createdAt ?? null,
    updatedAt: (latestHomily.updatedAt && typeof latestHomily.updatedAt.toDate === 'function') ? latestHomily.updatedAt.toDate().toISOString() : latestHomily.updatedAt ?? null,
  } : null;

  return (
    <>
      <section>
        <HeroCarousel />
      </section>
      <WelcomeSection />
      <NextService />
      <InfoCards latestNewsletter={serializableNewsletter} latestHomily={serializableHomily} />
      <NewsHighlights />
    </>
  );
}