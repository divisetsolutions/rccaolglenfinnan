'use client';

import * as React from 'react';
import Image from 'next/image';
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
  { src: '/hero-caol-1.jpg', alt: "St. John's, Caol, exterior" },
  { src: '/hero-glenfinnan-1.jpg', alt: 'St. Mary & St. Finnan, Glenfinnan, exterior' },
  { src: '/hero-caol-2.jpg', alt: "St. John's, Caol, interior" },
  { src: '/hero-glenfinnan-2.jpg', alt: 'St. Mary & St. Finnan, Glenfinnan, interior' },
];

const animations = ['ken-burns-1', 'ken-burns-2', 'ken-burns-3', 'ken-burns-4'];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

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
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <header className="absolute top-0 left-0 right-0 z-30 bg-black/50 p-4">
          <div className="w-full flex justify-between items-center text-white px-4 relative">
            <div className="text-left">
              <p className="font-bold text-xl">Welcome to the Parishes of Caol and Glenfinnan</p>
              <p className="text-lg">Serving St John the Evangelist Church, Caol & St Mary & St Finnan Church, Glenfinnan</p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <div
                className="relative w-[120px] h-[120px] rounded-full bg-white/20 p-2 cursor-pointer hover:bg-white/30 transition-colors duration-200"
                onClick={() => handleImageClick('/logo.png')}
              >
                <Image src="/logo.png" alt="Parish Logo" layout="fill" objectFit="contain" />
              </div>
            </div>
            <div className="text-right">
              <MainNav />
            </div>
          </div>
        </header>

        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} onClick={() => handleImageClick(image.src)}>
              <div className="relative h-[560px] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className={`object-cover w-full h-full ${mounted && activeIndex === index ? animations[index % animations.length] : ''}`}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/50 text-white hover:bg-white/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/50 text-white hover:bg-white/75" />
      </Carousel>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="sr-only">Image View</DialogTitle> {/* Visually hidden title */}
          </DialogHeader>
          <Image
            src={selectedImage}
            alt="Selected image"
            width={1200}
            height={800}
            className="object-contain w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}