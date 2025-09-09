"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
  { src: "/hero-caol-1.jpg", alt: "St. John's, Caol" },
  { src: "/hero-glenfinnan-1.jpg", alt: "St. Mary & St. Finnan, Glenfinnan" },
  { src: "/hero-caol-2.jpg", alt: "St. John's, Caol" },
  { src: "/hero-glenfinnan-2.jpg", alt: "St. Mary & St. Finnan, Glenfinnan" },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[560px]">
              <Image
                src="/logo.png"
                alt="Parish Logo"
                width={240}
                height={240}
                className="absolute top-4 left-4 z-20"
              />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl">
                  Welcome to the Parishes of Caol & Glenfinnan
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  The primary digital hub for parishioners and visitors.
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/50 text-white hover:bg-white/75" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/50 text-white hover:bg-white/75" />
    </Carousel>
  )
}