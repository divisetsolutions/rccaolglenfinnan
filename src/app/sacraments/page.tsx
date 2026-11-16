import type { Metadata } from 'next';
import Link from 'next/link';
import { ArchPhoto, PageHeader } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { PARISH, SACRAMENTS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sacraments',
  description: 'Baptism, confession, First Communion, Confirmation, marriage, anointing of the sick, funerals and becoming Catholic in the parish of Caol and Glenfinnan.',
  alternates: { canonical: '/sacraments' },
};

export default function SacramentsPage() {
  return (
    <>
      <PageHeader
        title="Sacraments"
        lede="From the font to the final farewell, the Church meets us at every turning of life. Here is how to take the next step."
        image="/img/glenfinnan-interior.jpg"
        imageAlt="The rose window above the altar at St Mary & St Finnan"
      />

      <div className="sticky top-[72px] z-30 border-b-2 border-line bg-mist/95 backdrop-blur">
        <nav aria-label="Sacraments" className="wrap flex gap-2 overflow-x-auto py-3">
          {SACRAMENTS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-[0.95rem] font-bold shadow-soft hover:bg-gorse">
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      {SACRAMENTS.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-36 py-16 md:py-24 ${i % 2 ? 'bg-white' : 'bg-mist'}`}>
          <div className={`wrap grid items-start gap-10 md:gap-16 ${i % 2 ? 'md:grid-cols-[1fr_300px]' : 'md:grid-cols-[300px_1fr]'}`}>
            <Reveal image className={`mx-auto w-full max-w-[260px] md:max-w-none ${i % 2 ? 'md:order-2' : ''}`}>
              <ArchPhoto src={s.image} alt="" className="aspect-[3/4]" sizes="300px" />
            </Reveal>
            <Reveal>
              <h2 className="display-lg">{s.title}</h2>
              <p className="lede mt-4 max-w-[56ch]">{s.intro}</p>
              <div className="mt-6 max-w-[62ch] space-y-5 text-[1.1rem] leading-[1.75]">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {s.steps.length > 0 && (
                <ol className="mt-8 max-w-[62ch] space-y-3">
                  {s.steps.map((step, n) => (
                    <li key={step} className="flex gap-4 rounded-2xl bg-heather-soft p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-heather font-bold text-white">{n + 1}</span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/contact?about=${encodeURIComponent(s.title)}`} className="btn btn-loch">
                  Ask about this
                </Link>
                <a href={PARISH.phoneHref} className="btn btn-ghost">
                  Call {PARISH.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
