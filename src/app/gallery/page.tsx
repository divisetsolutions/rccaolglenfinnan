import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader, Section, SectionHeading } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { CHURCHES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photographs of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" lede="Our two churches through the seasons." image="/img/glenfinnan-autumn.jpg" />
      {Object.values(CHURCHES).map((c, n) => (
        <Section key={c.id} tone={n % 2 ? 'white' : 'mist'}>
          <SectionHeading title={`${c.name}, ${c.place}`} />
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {[{ src: c.hero, alt: `${c.name} from outside` }, ...c.gallery].map((g, i) => (
              <Reveal image key={g.src} delay={(i % 3) * 100} className="mb-5 break-inside-avoid overflow-hidden rounded-3xl">
                <a href={g.src} target="_blank" rel="noopener noreferrer" aria-label={`${g.alt} (opens full size)`}>
                  <Image src={g.src} alt={g.alt} width={900} height={700} sizes="(max-width: 640px) 100vw, 400px" className={`w-full object-cover transition-transform duration-700 hover:scale-105 ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/2]'}`} />
                </a>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
