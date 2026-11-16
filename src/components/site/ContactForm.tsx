'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PARISH } from '@/lib/content';

const ENDPOINT = 'https://n8n.divisetsolutions.com/webhook/contact-form';

export function ContactForm() {
  const about = useSearchParams().get('about') ?? '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('website')) return; // spam trap
    setStatus('sending');
    try {
      const subject = String(data.get('subject') || '').trim();
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: `${subject ? `[${subject}] ` : ''}${data.get('message')}`,
        }),
      });
      setStatus(res.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[2rem] bg-heather-soft p-8" role="status">
        <h2 className="display-md text-heather">Message sent</h2>
        <p className="mt-3">Thank you. The parish office has your message and will reply as soon as it can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-bold">Your name</span>
          <input name="name" required autoComplete="name" className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-bold">Email address</span>
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block font-bold">What is it about?</span>
        <input name="subject" defaultValue={about} className="field" placeholder="A baptism, a wedding, a Mass intention…" />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-bold">Your message</span>
        <textarea name="message" required rows={6} className="field" />
      </label>
      <label className="hidden" aria-hidden>
        Leave this empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {status === 'failed' && (
        <p role="alert" className="rounded-2xl bg-white p-4 font-bold text-destructive">
          The message could not be sent. Please email {PARISH.email} or ring {PARISH.phone}.
        </p>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn btn-loch disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p className="text-[0.92rem] text-slate">We use your details only to reply to you.</p>
    </form>
  );
}
