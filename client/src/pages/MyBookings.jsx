import { useState } from 'react';
import { getBooking } from '../api.js';
import { toDate } from '../utils.js';
import { PageHero } from '../components/ui.jsx';
import { Link } from 'react-router-dom';
import { money } from '../components/CruiseCard.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function MyBookings() {
  const [ref, setRef] = useState('');
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async (e) => {
    e.preventDefault();
    if (!ref.trim()) return;
    setLoading(true); setErr(null); setResult(null);
    try {
      setResult(await getBooking(ref.trim()));
    } catch {
      setErr('No booking found with that reference. Check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero title="My Bookings" subtitle="Enter your booking reference (e.g. CD1A2B3C) to view your reservation."
        crumbs={[{ label: 'My Bookings' }]} />
      <div className="mx-auto max-w-xl px-4 py-12">
        <form onSubmit={lookup} className="flex gap-2">
          <input value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder="Booking reference"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm uppercase tracking-wider outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100" />
          <button className="rounded-xl bg-ocean-500 px-6 py-3 text-sm font-bold text-white hover:bg-ocean-600" disabled={loading}>
            {loading ? 'Looking up…' : 'Look up'}
          </button>
        </form>

        {err && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{err}</p>}

        {result && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <p className="font-mono text-lg font-bold tracking-widest text-navy-900">{result.booking_ref}</p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold uppercase text-emerald-700">{result.status}</span>
            </div>
            <p className="mt-3 font-extrabold text-navy-900">{result.cruise_name}</p>
            <p className="text-sm text-slate-600">{result.ship_name} · {result.line_name}</p>
            <p className="mt-2 text-sm text-slate-600">
              {fmt.format(toDate(result.departure_date))} · {result.nights} nights · {result.departure_port}
            </p>
            <p className="mt-2 text-sm font-bold text-navy-900">{result.num_guests} guests · {result.cabin_category} · {money(result.total_price)}</p>
            <Link to={`/booking/${result.booking_ref}`} className="mt-4 inline-block text-sm font-bold text-ocean-600 hover:underline">
              View full confirmation →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
