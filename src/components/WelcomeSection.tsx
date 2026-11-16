'use client';

import Image from 'next/image';
import { useState } from 'react';

export function WelcomeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative bg-ivory-soft border-y border-gold/25">
      <div className="mx-auto max-w-[1040px] px-6 py-[72px] md:py-[108px]">
        <div className="grid gap-10 md:gap-14 md:grid-cols-[300px_minmax(0,1fr)] items-start">
          {/* Portrait column */}
          <div className="md:sticky md:top-32">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group block w-full max-w-[300px] mx-auto md:mx-0"
              aria-label="View portrait of the parish priest"
            >
              <div className="relative aspect-[3/4] overflow-hidden ring-1 ring-gold/40 shadow-editorial">
                <Image
                  src="/parish-priest.jpg"
                  alt="Parish Priest"
                  fill
                  sizes="(max-width: 768px) 80vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </button>
          </div>

          {/* Letter column */}
          <article className="font-serif text-ink">
            <h2 className="font-display italic text-navy text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1]">
              Dear Friends,
            </h2>
            <hr className="gold-rule mt-5 mb-8 max-w-[80px]" />
            <p className="dropcap text-[1.2rem] leading-[1.75]">
              A very warm welcome to our two churches. Whether you have worshipped here all your
              life, or you have wandered in off the road and are not quite sure what brought you, I
              am glad you have found us.
            </p>

            <p className="mt-6 text-[1.1rem] leading-[1.75]">
              We are one parish family with two homes.{' '}
              <span className="font-medium">St John the Evangelist</span> in Caol stands at the foot
              of Ben Nevis, among the houses where most of us live and work.{' '}
              <span className="font-medium">St Mary and St Finnan</span> in Glenfinnan keeps watch
              over Loch Shiel, where visitors come from every corner of the world. The two could
              hardly be more different, and it is the same Mass and the same welcome at both.
            </p>

            <p className="mt-6 text-[1.1rem] leading-[1.75]">
              If you are new here, or coming back after a long time away, please do not stand at the
              door wondering. Come in and sit where you like. Ask me anything. This is our home, and
              it can be your home too.
            </p>

            <div className="mt-10 pt-8 border-t border-gold/30">
              <p className="font-serif italic text-navy text-[1.05rem]">With joy in Christ,</p>
              <p className="font-display text-navy text-2xl mt-2">
                Fr Charles Egbon, MSP
              </p>
              <p className="smallcaps text-stone mt-1">Parish Priest</p>
            </div>
          </article>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/85 backdrop-blur-sm p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-3xl">
            <Image
              src="/parish-priest.jpg"
              alt="Parish Priest"
              width={900}
              height={1200}
              className="object-contain ring-1 ring-gold/40"
            />
            <button
              className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-ivory text-navy text-xl font-medium shadow-editorial hover:bg-gold hover:text-ivory transition-colors"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
