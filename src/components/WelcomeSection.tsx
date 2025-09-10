'use client';

import Image from "next/image";
import { useState } from "react";

export function WelcomeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="container py-12 md:py-16">
      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-8">
        Welcome Message from the Parish Priest
      </h2>
      <div className="clearfix">
        <div className="float-left mr-8 mb-4">
          <Image
            src="/parish-priest.jpg"
            alt="Parish Priest"
            width={300}
            height={300}
            className="rounded-lg object-cover cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="space-y-4 text-lg">
          <p className="font-semibold">Dear Friends,</p>
          <p>
            A very warm welcome to the Parishes of Caol and Glenfinnan! Whether we gather here every Sunday, are returning after some time away, or are still searching for God’s presence in our lives, we want you to know: this is our home, and it can be your home too.
          </p>
          <p>
            Our churches each carry a story worth discovering. Glenfinnan, built in 1873, is a jewel of faith set in breathtaking surroundings, where thousands come every year not only to admire its beauty but also to glimpse the mystery of God within. Caol, built in 1970, is our family home of faith, nestled beneath majestic Ben Nevis—the highest mountain in the UK—a place where prayer and daily life meet in simple, joyful ways. Together, these parishes open their doors to welcome the searching, lift up the young, and strengthen the faithful, because Christ never stops calling us closer.
          </p>
          <p>
           We all know how easy it is to scroll through our phones, stream another show, or follow the latest feed. But no screen can baptize our children, no app can feed us with the Eucharist, and no social media post will whisper God’s mercy when we take our final breath. The Church alone carries us through every season of life—with hope, with love, with Christ.
           </p>
          <p>
            So let us come together again. Let us bring our laughter, our questions, our struggles, our families, and our dreams. God is waiting with open arms. And so are we.
          </p>
          <p className="font-semibold">With joy and excitement in Christ,</p>
          <p className="font-semibold">Revd Charles Ijeoma Egbon, MSP</p>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative">
            <Image
              src="/parish-priest.jpg"
              alt="Parish Priest"
              width={800}
              height={800}
              className="rounded-lg object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
