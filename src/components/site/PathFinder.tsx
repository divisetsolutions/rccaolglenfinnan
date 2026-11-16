'use client';

import { useState } from 'react';
import { HOMES, REGISTRAR, SITUATIONS, type HomeId, type SituationId } from '@/lib/weddings';

function Choice<T extends string>({ name, legend, options, value, onChange }: { name: string; legend: string; options: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="font-display text-[1.5rem] font-semibold leading-snug">{legend}</legend>
      <div className="mt-4 grid gap-2.5">
        {options.map((o) => (
          <label
            key={o.id}
            className={`flex min-h-[56px] cursor-pointer items-center gap-3.5 rounded-2xl border-2 px-4 py-3 font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gorse ${
              value === o.id ? 'border-heather bg-heather text-white' : 'border-line bg-white hover:border-heather'
            }`}
          >
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="sr-only" />
            <span aria-hidden className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${value === o.id ? 'border-white' : 'border-slate/50'}`}>
              {value === o.id && <span className="h-2.5 w-2.5 rounded-full bg-gorse" />}
            </span>
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Two questions that tell a couple what their own situation requires. */
export function PathFinder() {
  const [situation, setSituation] = useState<SituationId>('catholic');
  const [home, setHome] = useState<HomeId>('scotland');
  const s = SITUATIONS.find((x) => x.id === situation)!;
  const h = HOMES.find((x) => x.id === home)!;
  const possible = situation !== 'neither';

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div className="space-y-9">
        <Choice name="situation" legend="Which of these describes you?" options={SITUATIONS} value={situation} onChange={setSituation} />
        {possible && <Choice name="home" legend="Where do you live?" options={HOMES} value={home} onChange={setHome} />}
      </div>

      <div aria-live="polite" className="relative overflow-hidden rounded-[2rem] bg-loch p-7 text-mist md:p-10 lg:sticky lg:top-28">
        <div aria-hidden className="absolute -right-16 -top-10 h-72 w-56 rounded-t-full border-[18px] border-mist/[0.05]" />
        <div key={`${situation}-${home}`} className="fade-up relative" style={{ animationDuration: '0.5s' }}>
          <p className="font-bold text-gorse">Your path</p>
          <h3 className="display-md mt-2">{s.heading}</h3>
          <p className="mt-4 text-[1.1rem] leading-relaxed text-mist/85">{s.summary}</p>

          {possible && (
            <>
              <h4 className="mt-8 font-display text-[1.35rem] font-semibold">{h.heading}</h4>
              <p className="mt-2 leading-relaxed text-mist/85">{h.text}</p>

              <h4 className="mt-8 font-display text-[1.35rem] font-semibold">The papers the Church asks for</h4>
              <ul className="mt-3 space-y-2.5">
                {s.papers.map((p) => (
                  <li key={p} className="flex gap-3 text-mist/90">
                    <span aria-hidden className="mt-[0.62em] h-2 w-2 shrink-0 rounded-full bg-gorse" />
                    {p}
                  </li>
                ))}
                {home !== 'parish' && (
                  <li className="flex gap-3 text-mist/90">
                    <span aria-hidden className="mt-[0.62em] h-2 w-2 shrink-0 rounded-full bg-gorse" />
                    A letter of permission from your own parish priest.
                  </li>
                )}
              </ul>
            </>
          )}

          {s.note && <p className="mt-7 rounded-2xl bg-mist/[0.08] p-5 leading-relaxed">{s.note}</p>}

          {possible && situation !== 'civil' && (
            <p className="mt-7 border-t border-mist/15 pt-6 leading-relaxed text-mist/85">
              Scottish law has its own paperwork as well. Each of you gives notice to the registrar, as set out in the steps below. {REGISTRAR.name}:{' '}
              <a href={REGISTRAR.href} className="font-bold text-mist underline decoration-gorse underline-offset-4">
                {REGISTRAR.phone}
              </a>
              .
            </p>
          )}

          <a href="#enquire" className="btn btn-gorse mt-8">
            {possible ? 'Send your enquiry' : 'Write to us'}
          </a>
        </div>
      </div>
    </div>
  );
}
