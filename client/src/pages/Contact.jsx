import { useState } from 'react';
import { postContact } from '../api.js';
import { SITE } from '../site.js';
import { PageHero } from '../components/ui.jsx';

const input = 'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sent' | 'error'
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setStatus(null);
    try {
      await postContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHero title="Contact Us" subtitle="Questions about a sailing, a booking, or a fare? Our cruise experts are here."
        crumbs={[{ label: 'Contact' }]} />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          {[
            ['Call us', SITE.phone, SITE.phoneHref],
            ['Email', SITE.email, `mailto:${SITE.email}`],
            ['Visit', SITE.address, null],
            ['Hours', SITE.hours, null],
          ].map(([label, val, href]) => (
            <div key={label} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">{label}</p>
              {href
                ? <a href={href} className="mt-1 block font-bold text-navy-900 hover:text-ocean-600">{val}</a>
                : <p className="mt-1 font-bold text-navy-900">{val}</p>}
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-display text-xl font-bold text-navy-900">Send a message</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-semibold text-slate-600">Name *</label>
              <input className={input} required value={form.name} onChange={set('name')} /></div>
            <div><label className="mb-1 block text-sm font-semibold text-slate-600">Email *</label>
              <input type="email" className={input} required value={form.email} onChange={set('email')} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-semibold text-slate-600">Subject</label>
              <input className={input} value={form.subject} onChange={set('subject')} placeholder="e.g. Question about booking CD1A2B3C" /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-semibold text-slate-600">Message *</label>
              <textarea rows={5} className={input} required value={form.message} onChange={set('message')} /></div>
          </div>
          {status === 'sent' && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">Message received — we'll reply within one business day.</p>}
          {status === 'error' && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">Couldn't send right now — please call or email us.</p>}
          <button disabled={busy}
            className="mt-5 rounded-xl bg-ocean-500 px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-ocean-600 disabled:opacity-50">
            {busy ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  );
}
