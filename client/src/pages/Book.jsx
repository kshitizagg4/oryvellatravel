import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toDate } from '../utils.js';
import { createBooking, getCruise } from '../api.js';
import { money } from '../components/CruiseCard.jsx';
import { ErrorState, Spinner } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const CABIN_LABELS = { interior: 'Interior', oceanview: 'Oceanview', balcony: 'Balcony', suite: 'Suite' };
const input = 'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100';

const STEPS = ['Stateroom', 'Guest details', 'Review & confirm'];

function Stepper({ step }) {
  return (
    <ol className="mb-8 flex items-center justify-center gap-0">
      {STEPS.map((label, i) => (
        <li key={label} className="flex items-center">
          <div className="flex items-center gap-2">
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold ${
              i <= step ? 'bg-ocean-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{i + 1}</span>
            <span className={`hidden text-sm font-bold sm:block ${i <= step ? 'text-navy-900' : 'text-slate-400'}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && <span className={`mx-3 h-0.5 w-8 sm:w-16 ${i < step ? 'bg-ocean-500' : 'bg-slate-200'}`} />}
        </li>
      ))}
    </ol>
  );
}

export default function Book() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const [cruise, setCruise] = useState(null);
  const [err, setErr] = useState(null);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    cabin: sp.get('cabin') || 'interior',
    guests: 2,
    firstName: '', lastName: '', email: '', phone: '', requests: '',
  });

  useEffect(() => {
    getCruise(id).then(setCruise).catch(() => setErr('Cruise not found.'));
  }, [id]);

  const pricing = useMemo(() => cruise?.pricing.find((p) => p.cabin_category === form.cabin), [cruise, form.cabin]);
  const total = pricing ? (pricing.price + pricing.taxes) * form.guests : 0;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setSubmitting(true);
    try {
      const b = await createBooking({
        cruise_id: cruise.id, cabin_category: form.cabin, num_guests: form.guests,
        first_name: form.firstName, last_name: form.lastName,
        email: form.email, phone: form.phone, special_requests: form.requests,
      });
      navigate(`/booking/${b.booking_ref}`);
    } catch {
      setErr('Booking failed — please try again.');
      setSubmitting(false);
    }
  };

  if (err) return <ErrorState message={err} />;
  if (!cruise) return <Spinner label="Preparing your booking…" />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Stepper step={step} />

      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
        {/* cruise summary */}
        <div className="mb-6 flex gap-4 rounded-xl bg-slate-50 p-4">
          <img src={cruise.image_url} alt="" className="h-16 w-24 rounded-lg object-cover" />
          <div>
            <p className="font-extrabold text-navy-900">{cruise.name}</p>
            <p className="text-xs text-slate-500">
              {cruise.ship_name} · {fmt.format(toDate(cruise.departure_date))} · {cruise.nights} nights · {cruise.departure_port}
            </p>
          </div>
        </div>

        {step === 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-navy-900">Choose your stateroom</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cruise.pricing.map((p) => (
                <button key={p.cabin_category} type="button" onClick={() => setForm({ ...form, cabin: p.cabin_category })}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    form.cabin === p.cabin_category ? 'border-ocean-500 bg-ocean-50' : 'border-slate-200 hover:border-ocean-300'}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-navy-900">{CABIN_LABELS[p.cabin_category]}</p>
                    <p className="font-extrabold text-ocean-600">{money(p.price)}<span className="text-xs font-medium text-slate-500"> pp</span></p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">+{money(p.taxes)} taxes · {p.availability} available</p>
                </button>
              ))}
            </div>
            <div className="mt-5">
              <label className="mb-1 block text-sm font-bold text-navy-900">Guests</label>
              <select className={input} value={form.guests} onChange={set('guests')}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <button onClick={() => setStep(1)}
              className="mt-6 w-full rounded-xl bg-ocean-500 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-ocean-600">
              Continue
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-bold text-navy-900">Lead guest details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-semibold text-slate-600">First name *</label>
                <input className={input} value={form.firstName} onChange={set('firstName')} /></div>
              <div><label className="mb-1 block text-sm font-semibold text-slate-600">Last name *</label>
                <input className={input} value={form.lastName} onChange={set('lastName')} /></div>
              <div><label className="mb-1 block text-sm font-semibold text-slate-600">Email *</label>
                <input type="email" className={input} value={form.email} onChange={set('email')} /></div>
              <div><label className="mb-1 block text-sm font-semibold text-slate-600">Phone</label>
                <input className={input} value={form.phone} onChange={set('phone')} /></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-semibold text-slate-600">Special requests</label>
                <textarea rows={3} className={input} value={form.requests} onChange={set('requests')}
                  placeholder="Dietary needs, celebrations, accessibility…" /></div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(0)} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-navy-800">Back</button>
              <button onClick={() => setStep(2)}
                disabled={!form.firstName || !form.lastName || !form.email}
                className="flex-1 rounded-xl bg-ocean-500 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-ocean-600 disabled:opacity-40">
                Review booking
              </button>
            </div>
          </div>
        )}

        {step === 2 && pricing && (
          <div>
            <h2 className="font-display text-xl font-bold text-navy-900">Review & confirm</h2>
            <dl className="mt-4 space-y-2 rounded-xl bg-slate-50 p-5 text-sm">
              {[
                ['Cruise', cruise.name],
                ['Ship', `${cruise.ship_name} (${cruise.line_name})`],
                ['Departure', `${fmt.format(toDate(cruise.departure_date))} — ${cruise.departure_port}`],
                ['Stateroom', `${CABIN_LABELS[form.cabin]} × ${form.guests} guest${form.guests > 1 ? 's' : ''}`],
                ['Guest', `${form.firstName} ${form.lastName} — ${form.email}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-slate-500">{k}</dt><dd className="text-right font-semibold text-navy-900">{v}</dd>
                </div>
              ))}
              <div className="mt-3 border-t border-slate-200 pt-3">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Cruise fare ({form.guests} × {money(pricing.price)})</span><span className="font-semibold text-navy-900">{money(pricing.price * form.guests)}</span></div>
                <div className="mt-1 flex justify-between text-sm"><span className="text-slate-500">Taxes & fees ({form.guests} × {money(pricing.taxes)})</span><span className="font-semibold text-navy-900">{money(pricing.taxes * form.guests)}</span></div>
                <div className="mt-2 flex justify-between text-base font-extrabold text-navy-900"><span>Total</span><span>{money(total)}</span></div>
              </div>
            </dl>
            <p className="mt-3 text-xs text-slate-500">
              By confirming you agree to the booking terms. This is a demo — no payment is taken.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setStep(1)} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-navy-800">Back</button>
              <button onClick={submit} disabled={submitting}
                className="flex-1 rounded-xl bg-gradient-to-r from-sand-500 to-sand-600 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-sand-500/30 hover:brightness-110 disabled:opacity-50">
                {submitting ? 'Confirming…' : `Confirm booking — ${money(total)}`}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Questions? Call a cruise expert at <a className="font-bold text-ocean-600" href="tel:18005551234">1-800-555-1234</a>
      </p>
    </div>
  );
}
