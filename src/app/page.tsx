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
  return (
    <>
      <section>
        <HeroCarousel />
      </section>
      <WelcomeSection />
      <NextService />
      <InfoCards latestNewsletter={latestNewsletter} latestHomily={latestHomily} />
      <NewsHighlights />
    </>
  );
}