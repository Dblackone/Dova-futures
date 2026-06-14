'use client';

import { useState } from 'react';
import { COMPANY } from '@/lib/brand';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Static-compatible contact form. Posts to Web3Forms (no server runtime).
// Includes a honeypot field, graceful states (no circular spinner — the button
// shows a calm in-progress label), and a WhatsApp dual-CTA.
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: if filled, silently "succeed" without sending.
    if ((data.get('botcheck') as string)?.length) {
      setStatus('success');
      form.reset();
      return;
    }

    if (!accessKey || accessKey === 'your-web3forms-access-key') {
      setStatus('error');
      setErrorMsg(
        'The form is not yet configured. Please reach us on WhatsApp or by email below.',
      );
      return;
    }

    data.append('access_key', accessKey);
    data.append('subject', 'New enquiry — dovafutures.com');
    data.append('from_name', 'Dova Futures website');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try WhatsApp or email below.');
    }
  }

  const fieldClass =
    'w-full rounded-xl border-hair border-hairline bg-cream px-4 py-3 text-base text-charcoal placeholder:text-grey/70 transition-colors focus:border-terracotta focus:bg-white';
  const labelClass = 'mb-2 block text-[0.9rem] font-semibold text-charcoal';

  // Composed success state — no spinner.
  if (status === 'success') {
    return (
      <div className="rounded-card border-hair border-success/40 bg-white p-8 shadow-card sm:p-12">
        <p className="text-meta text-success">Message sent</p>
        <h3 className="mt-3 font-display text-display-sm font-bold text-charcoal">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="mt-4 max-w-prose text-grey">
          We&apos;ll reply to your message shortly. If it&apos;s time-sensitive,
          message us on WhatsApp and we&apos;ll pick it up faster.
        </p>
        <a
          href={COMPANY.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-success px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border-hair border-hairline bg-white p-6 shadow-card sm:p-10">
      {/* Honeypot — hidden from users, catches bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your name" />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@email.com" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-subject" className={labelClass}>
            What can we help with?
          </label>
          <input id="cf-subject" name="project_type" type="text" className={fieldClass} placeholder="e.g. Residential design, BIM coordination, interior" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={labelClass}>
            Project details
          </label>
          <textarea id="cf-message" name="message" required rows={5} className={cn(fieldClass, 'resize-y')} placeholder="Tell us about the site, timeline, and what you need." />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 rounded-xl border-hair border-terracotta/40 bg-terracotta/5 px-4 py-3 text-[0.95rem] text-charcoal">
          {errorMsg}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        <a
          href={COMPANY.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border-hair border-hairline px-7 py-3.5 text-base font-semibold text-charcoal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
        >
          Or message on WhatsApp
        </a>
      </div>
    </form>
  );
}
