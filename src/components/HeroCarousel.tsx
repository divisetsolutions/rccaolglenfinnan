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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

const images = [
  { src: "/hero-caol-1.jpg", alt: "St. John's, Caol, exterior", caption: "St John the Evangelist RC Church, Caol" },
  { src: "/hero-glenfinnan-1.jpg", alt: "St. Mary & St. Finnan, Glenfinnan, exterior", caption: "St Mary and St Finnan Church, Glenfinnan" },
  { src: "/hero-caol-2.jpg", alt: "St. John's, Caol, interior", caption: "St John the Evangelist RC Church, Caol" },
  { src: "/hero-glenfinnan-2.jpg", alt: "St. Mary & St. Finnan, Glenfinnan, interior", caption: "St Mary and St Finnan Church, Glenfinnan" },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [open, setOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState("")

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
    setOpen(true)
  }

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} onClick={() => handleImageClick(image.src)}>
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
                    {image.caption}
                  </h1>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/50 text-white hover:bg-white/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/50 text-white hover:bg-white/75" />
      </Carousel>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
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
  )
}
