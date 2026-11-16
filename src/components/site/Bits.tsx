import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/** The SVG shape behind every arched photograph. Rendered once in the layout. */
export function ArchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <clipPath id="lancet" clipPathUnits="objectBoundingBox">
          <path d="M0.004,1 L0.004,0.36 C0.004,0.2 0.22,0.075 0.5,0.006 C0.78,0.075 0.996,0.2 0.996,0.36 L0.996,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** A photograph framed in the lancet arch. The parent sets the size. */
export function ArchPhoto({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 80vw, 40vw',
  priority = false,
  drift = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  drift?: boolean;
}) {
  return (
    <div className={`arch relative overflow-hidden bg-mist-2 ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${drift ? 'drift' : ''}`} />
    </div>
  );
}

/** Title band for inner pages. */
export function PageHeader({
  title,
  lede,
  image,
  imageAlt = '',
  children,
}: {
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-loch text-mist">
      <div aria-hidden className="absolute -left-24 top-10 hidden h-[130%] w-72 rounded-t-full border-[22px] border-mist/[0.04] md:block" />
      <div className={`wrap relative grid items-end gap-10 pb-14 pt-14 md:pb-20 md:pt-20 ${image ? 'md:grid-cols-[1.25fr_0.75fr]' : ''}`}>
        <div>
          <h1 className="display-lg">
            <span className="line-mask">
              <span>{title}</span>
            </span>
          </h1>
          {lede && (
            <p className="fade-up mt-6 max-w-[56ch] text-[1.2rem] leading-relaxed text-mist/80" style={{ animationDelay: '250ms' }}>
              {lede}
            </p>
          )}
          {children && (
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: '400ms' }}>
              {children}
            </div>
          )}
        </div>
        {image && (
          <div className="arch-rise mx-auto hidden w-full max-w-[300px] md:block" style={{ animationDelay: '150ms' }}>
            <ArchPhoto src={image} alt={imageAlt} className="aspect-[3/4]" sizes="300px" priority drift />
          </div>
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = '', tone = 'mist' }: { children: ReactNode; className?: string; tone?: 'mist' | 'white' | 'loch' | 'heather' }) {
  const tones = {
    mist: 'bg-mist',
    white: 'bg-white',
    loch: 'bg-loch text-mist',
    heather: 'bg-heather-soft',
  };
  return (
    <section className={`${tones[tone]} py-16 md:py-24 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, lede, className = '' }: { title: string; lede?: string; className?: string }) {
  return (
    <Reveal className={`mb-10 max-w-[720px] md:mb-14 ${className}`}>
      <h2 className="display-lg">{title}</h2>
      {lede && <p className="lede mt-4">{lede}</p>}
    </Reveal>
  );
}

/** A slow, endless ribbon of parish photographs. Pauses under the pointer. */
export function PhotoRibbon({ photos }: { photos: readonly { src: string; alt: string }[] }) {
  const loop = [...photos, ...photos];
  return (
    <div className="ribbon overflow-hidden bg-mist py-10" aria-label="Photographs of the two churches">
      <div className="ribbon-track gap-5">
        {loop.map((p, i) => (
          <div key={i} className={`relative h-56 shrink-0 overflow-hidden md:h-72 ${i % 2 === 0 ? 'arch w-44 md:w-56' : 'w-72 rounded-3xl md:w-96'}`} aria-hidden={i >= photos.length}>
            <Image src={p.src} alt={i < photos.length ? p.alt : ''} fill sizes="384px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
