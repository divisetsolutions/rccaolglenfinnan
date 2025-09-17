'use client';

import Image from "next/image";
import { useState } from "react";

export function WelcomeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 md:py-16 px-8">
      
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
        <div className="space-y-4 text-xl">
          <p className="font-semibold">Dear Friends,</p>
          <p>
            A very warm welcome to the Roman Catholic Parish of Caol and Glenfinnan, in the Diocese of Argyll and the Isles, Scottish Highlands. Whether you gather with us every Sunday, are returning after some time away, or are still searching for God’s presence in your life, know this: this is our home, and it can be your home too.
          </p>
          <p>
            Our parish is one family serving two distinctive and deeply loved churches. St John’s in Caol is a vibrant and family-friendly church, nestled beneath majestic Ben Nevis, where prayer and daily life meet in simple, joyful ways. St Mary & St Finnan’s in Glenfinnan is a neo-Gothic treasure overlooking Loch Shiel, drawing people from all over the world to experience its beauty, history, and profound sense of the sacred.
          </p>
          <p>
            Together, we are a worshipping, welcoming, and serving community — celebrating the sacraments with joy, valuing and supporting everyone who walks through our doors, reaching out with compassion to those in need.
          </p>
          <p>
            No screen can baptise a child, no app can feed us with the Eucharist, and no post can whisper God’s mercy when we take our final breath. The Church carries us through every season of life — with hope, with love, with Christ.
          </p>
          <p>
            So come and see. Bring your laughter, your questions, your struggles, your families, and your dreams. God is waiting with open arms. And so are we.
          </p>
          <p className="font-semibold">With joy in Christ,</p>
          <p className="font-semibold">Revd Fr Charles Ijeoma Egbon, MSP (Missionary Society of St Paul)</p>
          <p className="font-semibold">Parish Priest</p>
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