'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CHURCHES, focus } from '@/lib/content';

const chapters = [
  { church: CHURCHES.caol, image: CHURCHES.caol.hero, alt: 'St John the Evangelist, Caol, under snow with Ben Nevis behind' },
  { church: CHURCHES.caol, image: CHURCHES.caol.inside, alt: 'The star-shaped ceiling inside St John’s' },
  { church: CHURCHES.glenfinnan, image: CHURCHES.glenfinnan.hero, alt: 'St Mary & St Finnan on its hillside above Loch Shiel' },
  { church: CHURCHES.glenfinnan, image: CHURCHES.glenfinnan.inside, alt: 'Stone arches and the rose window inside St Mary & St Finnan' },
];

/** As the text scrolls, the photograph beside it changes: one church, then the other. */
export function TwoChurches() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const blocks = [
    { i: 0, church: CHURCHES.caol, heading: CHURCHES.caol.name, text: CHURCHES.caol.summary },
    { i: 1, church: CHURCHES.caol, heading: 'Light from every side', text: CHURCHES.caol.story[1] },
    { i: 2, church: CHURCHES.glenfinnan, heading: CHURCHES.glenfinnan.name, text: CHURCHES.glenfinnan.summary },
    { i: 3, church: CHURCHES.glenfinnan, heading: 'Stone, glass and tartan', text: CHURCHES.glenfinnan.story[1] },
  ];

  return (
    <section className="bg-loch text-mist">
      <div className="wrap grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-0">
        <div className="top-0 hidden h-screen items-center md:sticky md:flex">
          <div className="arch relative aspect-[4/5] w-full max-w-[480px] overflow-hidden">
            {chapters.map((c, i) => (
              <Image
                key={c.image}
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                style={focus(c.image)}
                className={`object-cover transition-[opacity,transform] duration-[1100ms] ease-out ${active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
              />
            ))}
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-loch-deep/90 to-transparent px-6 pb-5 pt-16 text-center font-bold text-gorse">
              {chapters[active].church.setting}
            </p>
          </div>
        </div>

        <div>
          <div className="md:pt-[22vh]">
            <h2 className="display-lg">Two churches on the Road to the Isles, and a world of difference between them.</h2>
            <p className="mt-5 max-w-[48ch] text-[1.15rem] text-mist/75">It is the same Mass and the same welcome at both.</p>
          </div>
          {blocks.map((b) => (
            <div
              key={b.i}
              data-index={b.i}
              ref={(el) => {
                refs.current[b.i] = el;
              }}
              className="flex flex-col justify-center py-10 md:min-h-[78vh] md:py-0"
            >
              <div className="arch relative mb-6 aspect-[4/5] w-full max-w-[340px] overflow-hidden md:hidden">
                <Image src={chapters[b.i].image} alt={chapters[b.i].alt} fill sizes="340px" style={focus(chapters[b.i].image)} className="object-cover" />
              </div>
              <p className="font-bold text-gorse">{b.church.place}</p>
              <h3 className="display-md mt-2">{b.heading}</h3>
              <p className="mt-4 max-w-[46ch] text-[1.12rem] leading-relaxed text-mist/80">{b.text}</p>
              {(b.i === 1 || b.i === 3) && (
                <Link href={b.church.slug} className="btn btn-ghost-light mt-7 self-start">
                  Visit {b.church.short}
                </Link>
              )}
            </div>
          ))}
          <div className="hidden md:block md:h-[14vh]" />
        </div>
      </div>
    </section>
  );
}
