'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MainNav } from '@/components/MainNav';

const images = [
  { src: '/hero-glenfinnan-1.jpg', alt: 'St Mary and St Finnan, Glenfinnan, exterior' },
  { src: '/hero-caol-1.jpg', alt: "St John's, Caol, exterior" },
  { src: '/hero-glenfinnan-2.jpg', alt: 'St Mary and St Finnan, Glenfinnan, interior' },
  { src: '/hero-caol-2.jpg', alt: "St John's, Caol, interior" },
];

const animations = ['ken-burns-1', 'ken-burns-2', 'ken-burns-3', 'ken-burns-4'];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  const plugin = React.useRef(Autoplay({ delay: 6500, stopOnInteraction: true }));
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  return (
    <>
      {/* Solid navy header: never fights the photo for legibility */}
      <header className="relative z-30 bg-navy-deep text-ivory">
        <div className="border-b border-gold/30">
          <div className="mx-auto max-w-[1400px] px-6 py-2.5 flex items-center justify-center">
            <span className="smallcaps text-gold">
              Parish of Caol and Glenfinnan
              <span className="mx-3 text-gold/60">·</span>
              Diocese of Argyll and the Isles
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 py-5 flex items-center gap-6">
          <button
            type="button"
            onClick={() => handleImageClick('/logo.png')}
            className="relative shrink-0 h-[72px] w-[72px] rounded-full overflow-hidden ring-1 ring-gold/40 bg-ivory/5 transition-transform hover:scale-[1.03]"
            aria-label="View parish crest"
          >
            <Image src="/logo.png" alt="Parish crest" fill className="object-contain p-1" />
          </button>

          <Link href="/" className="flex-1 min-w-0">
            <div className="font-display text-[1.55rem] md:text-[1.7rem] leading-[1.05] tracking-[-0.01em] text-ivory">
              St John the Evangelist
              <span className="mx-2 text-gold">·</span>
              St Mary and St Finnan
            </div>
            <div className="smallcaps text-ivory/80 mt-1">Caol and Glenfinnan</div>
          </Link>
        </div>

        <div className="border-t border-gold/25">
          <div className="mx-auto max-w-[1400px] px-6 py-3.5 hero-nav">
            <MainNav />
          </div>
        </div>
      </header>

      {/* Carousel */}
      <div className="relative w-full">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative h-[74vh] min-h-[560px] max-h-[820px] overflow-hidden cursor-pointer"
                  onClick={() => handleImageClick(image.src)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className={`object-cover w-full h-full ${
                      mounted && activeIndex === index ? animations[index % animations.length] : ''
                    }`}
                  />
                  {/* A single gentle tint so images keep their colour */}
                  <div className="absolute inset-0 bg-navy-deep/20" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Headline panel: dark backing guarantees legibility on any photo */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
            <div className="mx-auto max-w-[1400px] px-6 pb-12 md:pb-16">
              <div className="pointer-events-auto inline-block bg-navy-deep/85 backdrop-blur-[2px] ring-1 ring-gold/30 shadow-editorial max-w-[640px]">
                <div className="px-8 md:px-10 py-8 md:py-10 border-l-2 border-gold">
                  <h1 className="reveal reveal-d1 font-display font-medium text-ivory text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.015em]">
                    Caol and Glenfinnan
                  </h1>
                  <p className="reveal reveal-d2 mt-5 font-serif text-ivory/85 text-[1.05rem] leading-[1.6] max-w-[520px]">
                    One parish family with two churches, at the foot of Ben Nevis and above the
                    waters of Loch Shiel. Whoever you are, you are welcome at Mass with us.
                  </p>
                  <div className="reveal reveal-d3 mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/calendar"
                      className="smallcaps inline-flex items-center justify-center rounded-none bg-oxblood px-6 py-3 text-ivory transition-colors duration-300 hover:bg-oxblood/85"
                    >
                      Mass and Service Times
                    </Link>
                    <Link
                      href="/about"
                      className="smallcaps inline-flex items-center justify-center rounded-none border border-ivory/60 px-6 py-3 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-navy-deep"
                    >
                      About the Parish
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Numeric slide readout, isolated bottom-right with its own scrim */}
          <div className="pointer-events-none absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
            <div className="inline-flex flex-col items-end px-4 py-2 bg-navy-deep/70 ring-1 ring-gold/25">
              <div className="font-display text-[1.6rem] md:text-[1.9rem] tabular-nums tracking-tight leading-none">
                <span className="text-gold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="mx-2 text-ivory/40">/</span>
                <span className="text-ivory/70">{String(images.length).padStart(2, '0')}</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px transition-all duration-500 ${
                      i === activeIndex ? 'w-8 bg-gold' : 'w-3 bg-ivory/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <CarouselPrevious className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-ivory/60 bg-navy-deep/50 text-ivory hover:bg-ivory hover:text-navy-deep transition-colors" />
          <CarouselNext className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-ivory/60 bg-navy-deep/50 text-ivory hover:bg-ivory hover:text-navy-deep transition-colors" />
        </Carousel>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] bg-ivory">
          <DialogHeader>
            <DialogTitle className="sr-only">Image View</DialogTitle>
          </DialogHeader>
          <Image
            src={selectedImage}
            alt="Selected image"
            width={1400}
            height={900}
            className="object-contain w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
