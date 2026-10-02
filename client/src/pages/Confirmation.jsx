import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toDate } from '../utils.js';
import { getBooking } from '../api.js';
import { money } from '../components/CruiseCard.jsx';
import { ErrorState, Spinner } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const CABIN_LABELS = { interior: 'Interior', oceanview: 'Oceanview', balcony: 'Balcony', suite: 'Suite' };

export default function Confirmation() {
  const { ref } = useParams();
  const [b, setB] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getBooking(ref).then(setB).catch(() => setErr('Booking not found.'));
  }, [ref]);

  if (err) return <ErrorState message={err} />;
  if (!b) return <Spinner label="Fetching confirmation…" />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.29 7.3-7.3a1 1 0 0 1 1.4 0z" clipRule="evenodd"/>
          </svg>
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">You're all set!</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your booking is confirmed. A confirmation has been sent to <strong>{b.email}</strong>.
        </p>
        <p className="mt-4 inline-block rounded-xl bg-navy-900 px-5 py-2 font-mono text-lg font-bold tracking-widest text-ocean-400">
          {b.booking_ref}
        </p>

        <dl className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-5 text-left text-sm">
          {[
            ['Cruise', b.cruise_name],
            ['Ship', `${b.ship_name} — ${b.line_name}`],
            ['Departure', `${fmt.format(toDate(b.departure_date))} from ${b.departure_port}`],
            ['Stateroom', `${CABIN_LABELS[b.cabin_category]} · ${b.num_guests} guest${b.num_guests > 1 ? 's' : ''}`],
            ['Guest', `${b.first_name} ${b.last_name}`],
            ['Total paid', money(b.total_price)],
            ['Status', b.status],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-slate-500">{k}</dt><dd className="text-right font-semibold text-navy-900">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/cruises" className="rounded-xl bg-ocean-500 px-6 py-3 text-sm font-bold text-white hover:bg-ocean-600">
            Browse more cruises
          </Link>
          <Link to="/" className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-navy-800 hover:border-ocean-300">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
