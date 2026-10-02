import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../utils.js';
import { getDeals } from '../api.js';
import { money } from '../components/CruiseCard.jsx';
import { PageHero, Spinner } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function Deals() {
  const [deals, setDeals] = useState(null);
  useEffect(() => { getDeals().then(setDeals).catch(() => setDeals([])); }, []);

  return (
    <div>
      <PageHero title="Cruise Deals" subtitle="Limited-time offers, last-minute steals and exclusive extras — updated daily."
        image="https://picsum.photos/seed/deals-hero/1920/500"
        crumbs={[{ label: 'Deals' }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {!deals ? <Spinner /> : deals.length === 0 ? (
          <p className="text-slate-500">No active deals right now — check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {deals.map((d) => (
              <Link key={d.id} to={d.cruise_id ? `/cruises/${d.cruise_id}` : '/cruises'}
                className="group flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative w-40 shrink-0 sm:w-52">
                  <img src={d.image_url} alt="" className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded bg-sand-500 px-2 py-1 text-[10px] font-extrabold uppercase text-navy-950">
                    {d.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-extrabold text-navy-900 group-hover:text-ocean-600">{d.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{d.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 text-xs font-semibold text-slate-500">
                    {d.cruise_name && <span>{d.cruise_name}</span>}
                    {d.ship_name && <span>· {d.ship_name}</span>}
                    {d.departure_date && <span>· departs {fmt.format(toDate(d.departure_date))}</span>}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {d.expires_at && (
                      <span className="text-xs font-bold text-sand-600">
                        Expires {fmt.format(toDate(d.expires_at))}
                      </span>
                    )}
                    <span className="ml-auto text-lg font-extrabold text-ocean-600">
                      {d.from_price ? `from ${money(d.from_price)}` : 'View →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
