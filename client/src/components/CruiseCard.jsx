import { Link } from 'react-router-dom';
import Rating from './Rating.jsx';
import { toDate } from '../utils.js';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
export const money = (n) => `$${Number(n ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export default function CruiseCard({ c }) {
  const perNight = c.nights ? Math.round(c.from_price / c.nights) : null;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-xl hover:ring-ocean-200 sm:flex-row">
      <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64 lg:w-72">
        <img src={c.image_url || c.ship_image} alt={c.name} loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {c.deal_badge && (
          <span className="absolute left-3 top-3 rounded-md bg-sand-500 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-950 shadow">
            {c.deal_badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-md bg-navy-950/80 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">
          {c.nights} nights
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ocean-600">{c.line_name}</p>
            <Link to={`/cruises/${c.id}`} className="mt-0.5 block text-lg font-extrabold leading-snug text-navy-900 hover:text-ocean-600">
              {c.name}
            </Link>
          </div>
          <div className="hidden shrink-0 text-right sm:block">
            <Rating value={c.ship_rating} />
            <p className="mt-0.5 text-xs text-slate-500">{c.ship_rating} ship rating</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-600">
          <Link to={`/ships/${c.ship_slug}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-ocean-600">
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M4 15.5 12 4l8 11.5c-2.6 1.2-5.3 1.5-8 1.5s-5.4-.3-8-1.5zM2 18c1.8 1 4.4 1.5 10 1.5S20.2 19 22 18l-1 3H3l-1-3z"/></svg>
            {c.ship_name}
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2zM3.5 9v6.25c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9h-13z" clipRule="evenodd"/></svg>
            {fmt.format(toDate(c.departure_date))}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.69 18.93l.003.002C9.578 19.007 9 18.59 9 18.59l-.69-.689A60.36 60.36 0 0 1 4.98 14.8C3.4 13 2.5 11.15 2.5 9.13 2.5 6.15 4.9 3.75 7.87 3.75c1.4 0 2.7.56 3.66 1.45a5.6 5.6 0 0 1 3.66-1.45c2.97 0 5.37 2.4 5.37 5.38 0 2.02-.9 3.87-2.48 5.67a60.3 60.3 0 0 1-3.32 3.1l-.69.69s-.58.41-.69.34z" clipRule="evenodd" transform="scale(0.9)"/><path d="M10 4a5 5 0 0 0-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 0 0-5-5zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" transform="translate(0,1)"/></svg>
            from {c.departure_port}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-xs text-slate-500">
            Roundtrip {c.return_port === c.departure_port ? c.departure_port.split(',')[0] : ''}
          </p>
          <div className="flex items-end gap-4">
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">from</p>
              <p className="text-2xl font-extrabold leading-none text-navy-900">{money(c.from_price)}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {perNight ? `${money(perNight)}/night · ` : ''}+{money(c.taxes)} taxes
              </p>
            </div>
            <Link to={`/cruises/${c.id}`}
              className="rounded-xl bg-ocean-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-ocean-600 active:scale-[0.98]">
              View Deal
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
