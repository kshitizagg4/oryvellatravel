import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminList } from '../../admin/api.js';
import { RESOURCES } from '../../admin/resources.js';
import { Spinner } from '../../components/ui.jsx';

const KEYS = ['cruises', 'ships', 'cruise_lines', 'destinations', 'ports', 'deals', 'itinerary_days', 'cruise_pricing', 'bookings'];

export default function Dashboard() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    Promise.all(KEYS.map((k) => adminList(k).then((r) => [k, r.length]).catch(() => [k, '—'])))
      .then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  if (!counts) return <Spinner label="Loading dashboard…" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Manage catalog content, pricing, deals and bookings.</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {KEYS.map((k) => (
          <Link key={k} to={`/admin/${k}`}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-ocean-300">
            <p className="text-3xl font-extrabold text-navy-900">{counts[k]}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{RESOURCES[k].label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <p className="font-bold text-navy-900">Quick actions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/admin/cruises/new" className="rounded-lg bg-ocean-500 px-4 py-2 text-sm font-bold text-white hover:bg-ocean-600">+ New cruise</Link>
          <Link to="/admin/deals/new" className="rounded-lg bg-sand-500 px-4 py-2 text-sm font-bold text-navy-950 hover:brightness-110">+ New deal</Link>
          <Link to="/admin/ships/new" className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-bold text-white hover:bg-navy-700">+ New ship</Link>
        </div>
      </div>
    </div>
  );
}
