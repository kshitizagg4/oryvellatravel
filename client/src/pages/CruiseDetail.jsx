import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toDate } from '../utils.js';
import { getCruise } from '../api.js';
import Rating from '../components/Rating.jsx';
import { money } from '../components/CruiseCard.jsx';
import { ErrorState, Spinner } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
const CABIN_LABELS = { interior: 'Interior', oceanview: 'Oceanview', balcony: 'Balcony', suite: 'Suite' };
const CABIN_DESC = {
  interior: 'Cozy stateroom, great value',
  oceanview: 'Natural light, sea views',
  balcony: 'Private balcony over the ocean',
  suite: 'Spacious suite, premium perks',
};

export default function CruiseDetail() {
  const { id } = useParams();
  const [cruise, setCruise] = useState(null);
  const [err, setErr] = useState(null);
  const [cabin, setCabin] = useState('interior');

  useEffect(() => {
    setCruise(null); setErr(null);
    getCruise(id).then(setCruise).catch(() => setErr('Cruise not found.'));
  }, [id]);

  if (err) return <ErrorState message={err} retry={() => window.history.back()} />;
  if (!cruise) return <Spinner label="Loading cruise…" />;

  const sel = cruise.pricing.find((p) => p.cabin_category === cabin) || cruise.pricing[0];
  const totalPP = sel ? sel.price + sel.taxes : 0;

  return (
    <div>
      {/* hero */}
      <div className="relative h-72 overflow-hidden bg-navy-900 sm:h-96">
        <img src={cruise.image_url || cruise.ship_image} alt={cruise.name} className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 pb-8">
            <nav className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/60">
              <Link to="/" className="hover:text-ocean-400">Home</Link><span>/</span>
              <Link to="/cruises" className="hover:text-ocean-400">Cruises</Link><span>/</span>
              <span className="text-white/90">{cruise.name}</span>
            </nav>
            {cruise.deals?.[0] && (
              <span className="mb-2 inline-block rounded-md bg-sand-500 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-950">
                {cruise.deals[0].badge}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{cruise.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
              <Link to={`/ships/${cruise.ship_slug}`} className="font-bold text-white hover:text-ocean-400">{cruise.ship_name}</Link>
              <span>{cruise.line_name}</span>
              <span>{fmt.format(toDate(cruise.departure_date))}</span>
              <Rating value={cruise.ship_rating} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            {/* quick facts */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Duration', `${cruise.nights} nights`],
                ['Departs', cruise.departure_port],
                ['Returns', cruise.return_port],
                ['Regions', cruise.destinations?.map((d) => d.name).join(', ') || '—'],
              ].map(([label, val]) => (
                <div key={label} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-bold text-navy-900">{val}</p>
                </div>
              ))}
            </div>

            {/* itinerary */}
            <section>
              <h2 className="font-display text-2xl font-bold text-navy-900">Itinerary</h2>
              <ol className="mt-5 space-y-0">
                {cruise.itinerary.map((d, i) => (
                  <li key={d.day_number} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < cruise.itinerary.length - 1 && (
                      <span className="absolute left-[15px] top-8 h-full w-0.5 bg-slate-200" />
                    )}
                    <span className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                      d.port_name ? 'bg-ocean-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {d.day_number}
                    </span>
                    <div className="flex-1 rounded-xl bg-white p-4 ring-1 ring-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-bold text-navy-900">{d.port_name || 'Day at Sea'}</p>
                        <p className="text-xs font-semibold text-slate-500">
                          {d.arrival_time && `Arrives ${d.arrival_time}`}
                          {d.arrival_time && d.departure_time && ' · '}
                          {d.departure_time && `Departs ${d.departure_time}`}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{d.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* pricing */}
            <section>
              <h2 className="font-display text-2xl font-bold text-navy-900">Stateroom pricing</h2>
              <p className="mt-1 text-sm text-slate-500">Per person, based on double occupancy.</p>
              <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy-900 text-left text-white">
                      <th className="px-5 py-3 font-bold">Cabin</th>
                      <th className="px-5 py-3 font-bold">Price pp</th>
                      <th className="hidden px-5 py-3 font-bold sm:table-cell">Taxes pp</th>
                      <th className="px-5 py-3 font-bold">Total pp</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cruise.pricing.map((p) => (
                      <tr key={p.cabin_category}
                        className={`border-t border-slate-100 transition ${cabin === p.cabin_category ? 'bg-ocean-50' : 'hover:bg-slate-50'}`}>
                        <td className="px-5 py-4">
                          <p className="font-bold text-navy-900">{CABIN_LABELS[p.cabin_category]}</p>
                          <p className="text-xs text-slate-500">{CABIN_DESC[p.cabin_category]}</p>
                          <p className={`mt-0.5 text-xs font-semibold ${p.availability <= 10 ? 'text-sand-600' : 'text-emerald-600'}`}>
                            {p.availability <= 10 ? `Only ${p.availability} left` : 'Available'}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          {p.original_price && (
                            <span className="mr-1.5 text-xs text-slate-400 line-through">{money(p.original_price)}</span>
                          )}
                          <span className="font-bold text-navy-900">{money(p.price)}</span>
                        </td>
                        <td className="hidden px-5 py-4 text-slate-600 sm:table-cell">{money(p.taxes)}</td>
                        <td className="px-5 py-4 font-extrabold text-ocean-600">{money(p.price + p.taxes)}</td>
                        <td className="px-5 py-4 text-right">
                          <button onClick={() => setCabin(p.cabin_category)}
                            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                              cabin === p.cabin_category
                                ? 'bg-ocean-500 text-white'
                                : 'bg-slate-100 text-navy-800 hover:bg-ocean-100'}`}>
                            {cabin === p.cabin_category ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ship */}
            <section>
              <h2 className="font-display text-2xl font-bold text-navy-900">About {cruise.ship_name}</h2>
              <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                <img src={cruise.ship_image} alt={cruise.ship_name} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-navy-900">{cruise.line_name}</p>
                    <Rating value={cruise.ship_rating} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{cruise.ship_description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ['Guests', cruise.passenger_capacity?.toLocaleString()],
                      ['Crew', cruise.crew?.toLocaleString()],
                      ['Tonnage', cruise.tonnage ? `${cruise.tonnage.toLocaleString()} GT` : null],
                      ['Entered service', cruise.year_built],
                    ].map(([l, v]) => v && (
                      <div key={l} className="rounded-lg bg-slate-50 p-3 text-center">
                        <p className="text-base font-extrabold text-navy-900">{v}</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{l}</p>
                      </div>
                    ))}
                  </div>
                  <Link to={`/ships/${cruise.ship_slug}`} className="mt-4 inline-block text-sm font-bold text-ocean-600 hover:underline">
                    View ship details →
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* booking sidebar */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">From</p>
              <p className="text-3xl font-extrabold text-navy-900">{money(sel?.price)}
                <span className="text-sm font-semibold text-slate-500"> /person</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {CABIN_LABELS[cabin]} · +{money(sel?.taxes)} taxes · {money(totalPP)} total pp
              </p>

              <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Sailing</span><span className="font-bold text-navy-900">{fmt.format(toDate(cruise.departure_date))}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Nights</span><span className="font-bold text-navy-900">{cruise.nights}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Ship</span><span className="font-bold text-navy-900">{cruise.ship_name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Port</span><span className="font-bold text-navy-900 text-right">{cruise.departure_port}</span></div>
              </div>

              <Link to={`/book/${cruise.id}?cabin=${cabin}`}
                className="mt-5 block rounded-xl bg-gradient-to-r from-sand-500 to-sand-600 py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-sand-500/30 transition hover:brightness-110 active:scale-[0.98]">
                Book {CABIN_LABELS[cabin]}
              </Link>
              <p className="mt-3 text-center text-xs text-slate-500">Free cancellation within 24h · Low deposit</p>
            </div>

            {cruise.deals?.length > 0 && (
              <div className="mt-4 rounded-2xl bg-navy-900 p-5 text-white">
                <p className="text-xs font-extrabold uppercase tracking-wider text-ocean-400">Active offers</p>
                {cruise.deals.map((d) => (
                  <div key={d.id} className="mt-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <span className="rounded bg-sand-500 px-1.5 py-0.5 text-[10px] font-extrabold text-navy-950">{d.badge}</span>
                    <p className="mt-1.5 text-sm font-bold">{d.title}</p>
                    <p className="text-xs text-white/60">{d.description}</p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
