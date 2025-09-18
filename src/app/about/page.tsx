import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the history, community, and life of the parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

export default function AboutPage() {
  return (
    <section className="container grid items-center gap-8 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          About Us
        </h1>
        <h2 className="text-xl font-semibold tracking-tight text-muted-foreground">
          Welcome to the Parish of Caol and Glenfinnan
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Nestled in the breathtaking Scottish Highlands, the Roman Catholic Parish of Caol and Glenfinnan is a vibrant faith community within the Diocese of Argyll and the Isles. Though we are one parish family, we are blessed with two distinctive and deeply cherished churches — each with its own character, history, and beauty, yet united in Christ.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-4">St John the Evangelist, Caol</h3>
          <p className="text-lg font-semibold text-muted-foreground mb-2">A vibrant family church at the heart of the community</p>
          <p className="text-muted-foreground">
            Built in 1970 to serve the growing Catholic community in Caol, St John’s quickly became more than a church building — it became a true spiritual home. For generations, families have gathered here to worship, celebrate, and support one another in faith.
          </p>
          <p className="text-muted-foreground mt-2">
            Today, St John’s continues to thrive as a lively parish centre filled with warmth, fellowship, and family spirit. Visitors are welcomed like old friends, children and young people are at the heart of parish life, and the liturgies are joyful and inclusive, enriched by music, prayer, and participation.
          </p>
          <p className="text-muted-foreground mt-2">
            Whether you join us for Sunday Mass or simply stop by for a quiet moment of prayer, you will find in St John’s a welcoming community that lives its faith with joy.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-4">St Mary & St Finnan, Glenfinnan</h3>
          <p className="text-lg font-semibold text-muted-foreground mb-2">A sacred treasure overlooking Loch Shiel</p>
          <p className="text-muted-foreground">
            Perched on a hill above Loch Shiel and framed by dramatic Highland mountains, St Mary & St Finnan’s is one of Scotland’s most beautiful churches. Designed by the renowned architect Edward Welby Pugin and completed in 1873, it is a masterpiece of neo-Gothic architecture with soaring arches, stained glass, and an atmosphere of peace and reverence.
          </p>
          <p className="text-muted-foreground mt-2">
            This sacred place draws visitors from across the world — pilgrims seeking prayer, travellers admiring its beauty, and couples choosing it as a stunning setting for their wedding. More than a landmark, it is a living church where the presence of God is felt in silence, prayer, and celebration.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">Our Parish Mission</h3>
        <p className="text-muted-foreground">
          Though St John’s and St Mary & St Finnan’s are miles apart in setting, they are united in heart and mission. Together, we strive to be:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
          <li>A <span className="font-semibold">worshipping community</span> – celebrating the Sacraments with reverence and joy.</li>
          <li>A <span className="font-semibold">welcoming community</span> – where all are valued, supported, and embraced with Christ’s love.</li>
          <li>A <span className="font-semibold">serving community</span> – reaching out with compassion to those in need, both locally and globally.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">You Are Always Welcome</h3>
        <p className="text-muted-foreground">
          Whether you are a local resident, a visitor to the Highlands, or someone seeking a spiritual home, you are warmly invited to be part of our parish life.
        </p>
        <p className="text-muted-foreground mt-2">
          Come and discover the lively community of St John’s in Caol and the timeless beauty of St Mary & St Finnan’s in Glenfinnan. Two churches. One parish. United in Christ.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 mt-1" />
          <div>
            <p className="font-semibold">St John the Evangelist</p>
            <p>St John’s Road, Caol, Fort William, PH33 7PR</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 mt-1" />
          <div>
            <p className="font-semibold">St Mary & St Finnan</p>
            <p>Glenfinnan, Inverness-shire, PH37 4LT</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/calendar" className="text-primary hover:underline">See Mass times →</Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/contact" className="text-primary hover:underline">Contact us →</Link>
      </div>

      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
        “A hidden treasure of peace, beauty, and welcome in the Scottish Highlands.”
      </blockquote>

    </section>
  );
}
