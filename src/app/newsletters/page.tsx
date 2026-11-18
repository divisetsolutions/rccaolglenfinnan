import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/site/Bits';
import { Reveal } from '@/components/site/Reveal';
import { getNewsletters, longDate } from '@/lib/data';

// Re-read content from the database at most every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Read or download the weekly newsletter of the Catholic parish of Caol and Glenfinnan: Mass intentions, notices and the week ahead at St John’s, Caol and St Mary & St Finnan, Glenfinnan.',
  alternates: { canonical: '/newsletters' },
};

export default async function NewslettersPage() {
  const newsletters = await getNewsletters();
  const [latest, ...older] = newsletters;

  return (
    <>
      <PageHeader title="Parish newsletter" lede="Published every weekend with the notices, anniversaries and the programme for the week ahead." image="/img/caol-nave.jpg" />
      <Section>
        {!latest ? (
          <p className="lede max-w-[56ch]">Printed copies are available at both churches each Sunday. The online archive will return here shortly.</p>
        ) : (
          <>
            <Reveal className="grid items-center gap-6 rounded-[2rem] bg-loch p-8 text-mist shadow-lift md:grid-cols-[1fr_auto] md:p-12">
              <div>
                <p className="font-bold text-gorse">Latest issue</p>
                <h2 className="display-lg mt-2">{latest.title}</h2>
              </div>
              {latest.fileUrl && (
                <a href={latest.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gorse">
                  Open the newsletter (PDF)
                </a>
              )}
            </Reveal>
            {older.length > 0 && (
              <>
                <h2 className="display-md mt-14">Earlier issues</h2>
                <ul className="mt-4">
                  {older.map((n) => (
                    <li key={n.id}>
                      <a href={n.fileUrl} target="_blank" rel="noopener noreferrer" className="group grid gap-1 border-t-2 border-line py-5 md:grid-cols-[11rem_1fr_auto] md:items-baseline md:gap-8">
                        <span className="text-slate">{longDate(n.date)}</span>
                        <span className="font-display text-[1.4rem] font-semibold group-hover:text-heather">{n.title}</span>
                        <span className="font-bold text-heather">PDF</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </Section>
    </>
  );
}
