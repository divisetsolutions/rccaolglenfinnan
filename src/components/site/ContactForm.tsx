'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PARISH } from '@/lib/content';

const ENDPOINT = 'https://n8n.divisetsolutions.com/webhook/contact-form';

export function ContactForm() {
  const about = useSearchParams().get('about') ?? '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [draft, setDraft] = useState('');
  const [topic, setTopic] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('website')) return; // spam trap
    setDraft(`${data.get('message')}\n\n${data.get('name')}`);
    setTopic(String(data.get('subject') || '').trim() || 'Message from the parish website');
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
        <div role="alert" className="rounded-2xl border-2 border-gorse bg-white p-5">
          <p className="font-bold">Our form could not send this just now. Your words are not lost.</p>
          <p className="mt-1">Press the button and the same text opens in your own email, ready to send to us.</p>
          <a href={`mailto:${PARISH.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(draft)}`} className="btn btn-gorse mt-4">
            Send it by email
          </a>
          <p className="mt-3 text-[0.92rem] text-slate">
            Or write to {PARISH.email} or ring {PARISH.phone}.
          </p>
        </div>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn btn-loch disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p className="text-[0.92rem] text-slate">We use your details only to reply to you.</p>
    </form>
  );
}
