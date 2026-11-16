import Link from 'next/link';
import { ArchPhoto } from '@/components/site/Bits';

export default function NotFound() {
  return (
    <section className="wrap grid items-center gap-10 py-20 md:grid-cols-[1fr_280px]">
      <div>
        <h1 className="display-lg">That page has wandered off.</h1>
        <p className="lede mt-4 max-w-[48ch]">The address may have changed when the website was rebuilt. These will get you back on the road.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-loch">Home</Link>
          <Link href="/calendar" className="btn btn-ghost">Mass times</Link>
          <Link href="/contact" className="btn btn-ghost">Contact</Link>
        </div>
      </div>
      <ArchPhoto src="/img/loch.jpg" alt="" className="mx-auto aspect-[3/4] w-full max-w-[280px]" sizes="280px" />
    </section>
  );
}
