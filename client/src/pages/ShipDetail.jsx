import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toDate } from '../utils.js';
import { getShip } from '../api.js';
import Rating from '../components/Rating.jsx';
import { money } from '../components/CruiseCard.jsx';
import { ErrorState, PageHero, Spinner } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function ShipDetail() {
  const { slug } = useParams();
  const [ship, setShip] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setShip(null); setErr(null);
    getShip(slug).then(setShip).catch(() => setErr('Ship not found.'));
  }, [slug]);

  if (err) return <ErrorState message={err} />;
  if (!ship) return <Spinner />;

  return (
    <div>
      <PageHero title={ship.name} subtitle={ship.description} image={ship.image_url}
        crumbs={[
          { label: 'Cruise Lines', to: '/cruise-lines' },
          { label: ship.line_name, to: `/cruise-lines/${ship.line_slug}` },
          { label: ship.name },
        ]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Guests', ship.passenger_capacity?.toLocaleString()],
            ['Crew', ship.crew?.toLocaleString()],
            ['Tonnage', ship.tonnage ? `${ship.tonnage.toLocaleString()} GT` : null],
            ['Length', ship.length_m ? `${ship.length_m} m` : null],
            ['Speed', ship.speed_knots ? `${ship.speed_knots} kn` : null],
            ['Built', ship.year_built],
            ['Refurbished', ship.year_refurbished],
            ['Rating', `${ship.rating} / 5`],
          ].filter(([, v]) => v != null).map(([l, v]) => (
            <div key={l} className="rounded-xl bg-white p-4 text-center ring-1 ring-slate-200">
              <p className="text-lg font-extrabold text-navy-900">{v}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-navy-900">Upcoming sailings on {ship.name}</h2>
          <Link to={`/cruises?ship=${ship.id}`} className="text-sm font-bold text-ocean-600 hover:underline">
            View with filters →
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          {ship.cruises.length === 0 && <p className="text-slate-500">No upcoming sailings scheduled.</p>}
          {ship.cruises.map((c) => (
            <Link key={c.id} to={`/cruises/${c.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-ocean-300">
              <div>
                <p className="font-extrabold text-navy-900">{c.name}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {fmt.format(toDate(c.departure_date))} · {c.nights} nights · from {c.departure_port}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-ocean-600">{money(c.from_price)}</p>
                <p className="text-xs text-slate-500">per person</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
