import { HeroCarousel } from "@/components/HeroCarousel";
import NextService from "@/components/NextService";
import NewsHighlights from "@/components/NewsHighlights";
import { WelcomeSection } from "@/components/WelcomeSection";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'St John the Evangelist, Caol & St Mary & St Finnan, Glenfinnan',
  description: 'The primary digital hub for the Roman Catholic parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan, providing Mass times, news, sacraments information, and contact details.',
};

export default function Home() {
  return (
    <>
      <section>
        <HeroCarousel />
      </section>
      <WelcomeSection />
      <NextService />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/schedule" className="group">
            <div className="flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors h-full">
              <Image src="/window.svg" alt="Mass Times" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Mass & Service Times</h3>
              <p className="text-gray-600">View the weekly schedule for both parishes.</p>
            </div>
          </Link>
          <Link href="/news" className="group">
            <div className="flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors h-full">
              <Image src="/globe.svg" alt="Parish News" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Parish News & Events</h3>
              <p className="text-gray-600">Read the latest announcements and upcoming events.</p>
            </div>
          </Link>
          <Link href="/newsletters" className="group">
            <div className="flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors h-full">
              <Image src="/file.svg" alt="Weekly Newsletters" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Weekly Newsletters</h3>
              <p className="text-gray-600">Download and read the Parish Newsletters.</p>
            </div>
          </Link>
          <Link href="/news" className="group">
            <div className="flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors h-full">
              <Image src="/file.svg" alt="Sunday Homily" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Sunday Homily</h3>
              <p className="text-gray-600">Read the latest Sunday Homily.</p>
            </div>
          </Link>
        </div>
      </section>
      <NewsHighlights />
    </>
  );
}