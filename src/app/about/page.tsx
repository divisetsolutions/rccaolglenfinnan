import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the history, community, and life of the parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

export default function AboutPage() {
  return (
    <section className="container grid items-center gap-8 pb-8 pt-6 md:py-10">
      <div className="relative h-64 rounded-lg overflow-hidden mb-8">
        <Image
          src="/about-hero.jpg"
          alt="A beautiful view of the Glenfinnan landscape"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-white md:text-5xl">
            About Us
          </h1>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-primary">
          Welcome to the Parish of Caol and Glenfinnan
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
          Nestled in the breathtaking Scottish Highlands, the Roman Catholic Parish of Caol and Glenfinnan is a vibrant faith community within the Diocese of Argyll and the Isles. Though we are one parish family, we are blessed with two distinctive and deeply cherished churches — each with its own character, history, and beauty, yet united in Christ.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-4">St John the Evangelist, Caol</h3>
          <p className="text-xl font-semibold text-muted-foreground mb-4">A vibrant family church at the heart of the community</p>
          <p className="text-muted-foreground">
            Built in 1970 to serve the growing Catholic community in Caol, St John’s quickly became more than a church building — it became a true spiritual home. For generations, families have gathered here to worship, celebrate, and support one another in faith.
          </p>
          <p className="text-muted-foreground mt-2">
            Today, St John’s continues to thrive as a lively parish centre filled with warmth, fellowship, and family spirit. Visitors are welcomed like old friends, children and young people are at the heart of parish life, and the liturgies are joyful and inclusive, enriched by music, prayer, and participation.
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image
            src="/st-johns-main.jpg"
            alt="Image of St. John's Church"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="relative h-40 rounded-lg overflow-hidden"><Image src="/st-johns-gallery-1.jpg" alt="Gallery image of St. John's" layout="fill" objectFit="cover" /></div>
        <div className="relative h-40 rounded-lg overflow-hidden"><Image src="/st-johns-gallery-2.jpg" alt="Gallery image of St. John's" layout="fill" objectFit="cover" /></div>
        <div className="relative h-40 rounded-lg overflow-hidden"><Image src="/st-johns-gallery-3.jpg" alt="Gallery image of St. John's" layout="fill" objectFit="cover" /></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
        <div className="relative h-80 rounded-lg overflow-hidden order-last md:order-first">
          <Image
            src="/st-marys-main.jpg"
            alt="Image of St. Mary & St. Finnan's Church"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-4">St Mary & St Finnan, Glenfinnan</h3>
          <p className="text-xl font-semibold text-muted-foreground mb-4">A sacred treasure overlooking Loch Shiel</p>
          <p className="text-muted-foreground">
            Perched on a hill above Loch Shiel and framed by dramatic Highland mountains, St Mary & St Finnan’s is one of Scotland’s most beautiful churches. Designed by the renowned architect Edward Welby Pugin and completed in 1873, it is a masterpiece of neo-Gothic architecture with soaring arches, stained glass, and an atmosphere of peace and reverence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="relative h-40 rounded-lg overflow-hidden"><Image src="/st-marys-gallery-1.jpg" alt="Gallery image of St. Mary's" layout="fill" objectFit="cover" /></div>
        <div className="relative h-40 rounded-lg overflow-hidden"><Image src="/st-marys-gallery-2.jpg" alt="Gallery image of St. Mary's" layout="fill" objectFit="cover" /></div>
        <div className="relative h-40 rounded-lg overflow-hidden"><Image src="/st-marys-gallery-3.jpg" alt="Gallery image of St. Mary's" layout="fill" objectFit="cover" /></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-4">Our Parish Mission</h3>
          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2 text-lg">
            <li>A <span className="font-semibold">worshipping community</span> – celebrating the Sacraments with reverence and joy.</li>
            <li>A <span className="font-semibold">welcoming community</span> – where all are valued, supported, and embraced with Christ’s love.</li>
            <li>A <span className="font-semibold">serving community</span> – reaching out with compassion to those in need, both locally and globally.</li>
          </ul>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image
            src="/parish-mission-community.jpg"
            alt="Image of the Parish Community"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold tracking-tight">You Are Always Welcome</h3>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
          Whether you are a local resident, a visitor to the Highlands, or someone seeking a spiritual home, you are warmly invited to be part of our parish life. Come and discover the lively community of St John’s in Caol and the timeless beauty of St Mary & St Finnan’s in Glenfinnan. Two churches. One parish. United in Christ.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-muted-foreground mt-8">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 mt-1" />
          <div>
            <p className="font-semibold">St John the Evangelist</p>
            <a href="https://www.google.com/maps/place/Saint+John+the+Evangelist+R.C.+Church/@56.8369451,-5.100093,17z/data=!3m1!4b1!4m6!3m5!1s0x488eccbeffb1134b:0xea5c6bc9b28b2b87!8m2!3d56.8369452!4d-5.0952221!16s%2Fg%2F1thpwf25?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:underline">
              <p>St John’s Road, Caol, Fort William, PH33 7PR</p>
            </a>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 mt-1" />
          <div>
            <p className="font-semibold">St Mary & St Finnan</p>
            <a href="https://www.google.com/maps/place/Saint+Mary+%26+Saint+Finnan+Church/@56.8714437,-5.4440628,17z/data=!3m1!4b1!4m6!3m5!1s0x488eb2354f4a1a35:0x7d175c19b2562883!8m2!3d56.8714437!4d-5.4414879!16s%2Fg%2F119w9qxjy?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:underline">
              <p>Glenfinnan, Inverness-shire, PH37 4LT</p>
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Link href="/calendar" className="text-primary hover:underline">See Mass times →</Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/contact" className="text-primary hover:underline">Contact us →</Link>
      </div>

      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mt-8 max-w-2xl mx-auto text-center">
        “A hidden treasure of peace, beauty, and welcome in the Scottish Highlands.”
      </blockquote>

    </section>
  );
}
