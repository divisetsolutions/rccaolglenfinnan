'use client';

import { useState } from 'react';
import { PARISH } from '@/lib/content';

const ENDPOINT = PARISH.formEndpoint;

const GLENFINNAN_EMAIL = 'glenfinnan@rcdai.org.uk';

const FAITHS = ['Catholic', 'Another Christian church', 'Another faith', 'No religion'];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-bold">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[0.92rem] text-slate">{hint}</span>}
    </label>
  );
}

function Partner({ n }: { n: 1 | 2 }) {
  return (
    <fieldset className="rounded-[1.75rem] bg-white p-6 shadow-soft md:p-7">
      <legend className="float-left mb-5 w-full font-display text-[1.5rem] font-semibold">{n === 1 ? 'First partner' : 'Second partner'}</legend>
      <div className="clear-both grid gap-5">
        <Field label="Full name">
          <input name={`p${n}name`} required autoComplete="off" className="field" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Religion">
            <select name={`p${n}faith`} required defaultValue="" className="field">
              <option value="" disabled>
                Choose one
              </option>
              {FAITHS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>
          <Field label="Baptised?">
            <select name={`p${n}baptised`} required defaultValue="" className="field">
              <option value="" disabled>
                Choose one
              </option>
              <option>Yes</option>
              <option>No</option>
              <option>Not sure</option>
            </select>
          </Field>
        </div>
        <Field label="Home parish and diocese" hint="If you are Catholic. Leave empty if this does not apply.">
          <input name={`p${n}parish`} className="field" />
        </Field>
        <Field label="Married before?">
          <select name={`p${n}before`} required defaultValue="" className="field">
            <option value="" disabled>
              Choose one
            </option>
            <option>No</option>
            <option>Yes</option>
          </select>
        </Field>
      </div>
    </fieldset>
  );
}

export function WeddingEnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [draft, setDraft] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (d.get('website')) return; // spam trap
    const v = (k: string) => String(d.get(k) || '').trim() || 'not given';
    const partner = (n: 1 | 2) =>
      [`Partner ${n}: ${v(`p${n}name`)}`, `  Religion: ${v(`p${n}faith`)}`, `  Baptised: ${v(`p${n}baptised`)}`, `  Home parish and diocese: ${v(`p${n}parish`)}`, `  Married before: ${v(`p${n}before`)}`].join('\n');
    const message = [
      '[Wedding enquiry]',
      '',
      partner(1),
      '',
      partner(2),
      '',
      `Reply to: ${v('email')}`,
      `Phone: ${v('phone')}`,
      `Where we live: ${v('live')}`,
      `Church: ${v('church')}`,
      `Dates hoped for: ${v('dates')}`,
      `Guests: ${v('guests')}`,
      `Already married in a civil ceremony: ${v('civil')}`,
      `Spoken to our own parish priest: ${v('spoken')}`,
      '',
      'Anything else:',
      v('message'),
    ].join('\n');

    setDraft(message);
    if (!ENDPOINT) {
      setStatus('failed');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: `Wedding enquiry from ${d.get('p1name')} and ${d.get('p2name')}`, name: `${d.get('p1name')} and ${d.get('p2name')}`, email: d.get('email'), message }),
      });
      setStatus(res.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-soft md:p-10" role="status">
        <h3 className="display-md text-heather">Enquiry sent</h3>
        <p className="mt-3 max-w-[56ch] text-[1.1rem] leading-relaxed">
          Thank you, and congratulations on your engagement. Fr Charles will read your enquiry and reply by email. Please do not book anything else until you have heard from him.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Partner n={1} />
        <Partner n={2} />
      </div>

      <fieldset className="rounded-[1.75rem] bg-white p-6 shadow-soft md:p-7">
        <legend className="float-left mb-5 w-full font-display text-[1.5rem] font-semibold">The day you are hoping for</legend>
        <div className="clear-both grid gap-5 md:grid-cols-2">
          <Field label="Which church?">
            <select name="church" defaultValue="St Mary & St Finnan, Glenfinnan" className="field">
              <option>St Mary &amp; St Finnan, Glenfinnan</option>
              <option>St John the Evangelist, Caol</option>
            </select>
          </Field>
          <Field label="About how many guests?">
            <input name="guests" inputMode="numeric" className="field" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Dates you would like" hint="Give two or three if you can, with the time of day you prefer.">
              <input name="dates" required className="field" />
            </Field>
          </div>
          <Field label="Already married in a civil ceremony?" hint="If yes, tell us where and when below.">
            <select name="civil" required defaultValue="" className="field">
              <option value="" disabled>
                Choose one
              </option>
              <option>No</option>
              <option>Yes</option>
            </select>
          </Field>
          <Field label="Spoken to your own parish priest yet?">
            <select name="spoken" required defaultValue="" className="field">
              <option value="" disabled>
                Choose one
              </option>
              <option>Yes</option>
              <option>Not yet</option>
              <option>We have no parish at present</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="rounded-[1.75rem] bg-white p-6 shadow-soft md:p-7">
        <legend className="float-left mb-5 w-full font-display text-[1.5rem] font-semibold">How to reach you</legend>
        <div className="clear-both grid gap-5 md:grid-cols-2">
          <Field label="Email address">
            <input name="email" type="email" required autoComplete="email" className="field" />
          </Field>
          <Field label="Phone, with country code" hint="Optional.">
            <input name="phone" type="tel" autoComplete="tel" className="field" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Town and country where you live">
              <input name="live" required className="field" />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Anything else we should know" hint="Music, flowers, a family tradition, a question you have.">
              <textarea name="message" rows={5} className="field" />
            </Field>
          </div>
        </div>
      </fieldset>

      <label className="hidden" aria-hidden>
        Leave this empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {status === 'failed' && (
        <div role="alert" className="rounded-2xl border-2 border-gorse bg-white p-5">
          <p className="font-bold">One more step to send this.</p>
          <p className="mt-1">Press the button and your words open in your own email, ready to send to us.</p>
          <a href={`mailto:${GLENFINNAN_EMAIL}?subject=${encodeURIComponent('Wedding enquiry')}&body=${encodeURIComponent(draft)}`} className="btn btn-gorse mt-4">
            Send it by email
          </a>
          <p className="mt-3 text-[0.92rem] text-slate">
            Or write to {GLENFINNAN_EMAIL} or ring {PARISH.phone}.
          </p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={status === 'sending'} className="btn btn-loch disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className="text-[0.92rem] text-slate">Sending this commits you to nothing. We use your details only to reply to you.</p>
      </div>
    </form>
  );
}
