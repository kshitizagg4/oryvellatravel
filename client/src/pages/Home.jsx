import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCruises, getDeals, getDestinations, getLines } from '../api.js';
import SearchWidget, { monthLabel } from '../components/SearchWidget.jsx';
import CruiseCard, { money } from '../components/CruiseCard.jsx';
import Rating from '../components/Rating.jsx';
import { Spinner } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [deals, setDeals] = useState(null);
  const [dests, setDests] = useState(null);
  const [lines, setLines] = useState(null);

  useEffect(() => {
    getCruises({ featured: 1, sort: 'date_asc', page_size: 6 }).then((r) => setFeatured(r.data)).catch(() => setFeatured([]));
    getDeals().then(setDeals).catch(() => setDeals([]));
    getDestinations().then(setDests).catch(() => setDests([]));
    getLines().then(setLines).catch(() => setLines([]));
  }, []);

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative">
        <div className="relative h-[420px] overflow-hidden bg-navy-900 sm:h-[480px]">
          <img src="https://picsum.photos/seed/ocean-voyage/1920/720" alt="Cruise ship at sea"
            className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/30 to-navy-950/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:text-left">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-ocean-400">Sail the world</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
                Find your perfect<br />cruise vacation
              </h1>
              <p className="mt-4 max-w-lg text-sm text-white/80 sm:text-base">
                Compare 50+ sailings across the world's best cruise lines. Exclusive deals, transparent pricing, expert support.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <SearchWidget />
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
          {[
            ['50+', 'Sailings worldwide'],
            ['10', 'Cruise lines'],
            ['4.8★', 'Average ship rating'],
            ['24/7', 'Cruise expert support'],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-navy-800">{num}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Deals ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ocean-600">Limited time</p>
            <h2 className="mt-1 font-display text-3xl font-bold text-navy-900">Hot cruise deals</h2>
          </div>
          <Link to="/deals" className="text-sm font-bold text-ocean-600 hover:underline">View all →</Link>
        </div>
        {!deals ? <Spinner /> : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deals.slice(0, 4).map((d) => (
              <Link key={d.id} to={d.cruise_id ? `/cruises/${d.cruise_id}` : '/deals'}
                className="group relative overflow-hidden rounded-2xl bg-navy-900 p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <img src={d.image_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 transition group-hover:opacity-40" />
                <div className="relative">
                  <span className="inline-block rounded-md bg-sand-500 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-950">{d.badge}</span>
                  <p className="mt-3 text-lg font-extrabold leading-snug">{d.title}</p>
                  <p className="mt-1 text-xs text-white/70">{d.cruise_name}</p>
                  <p className="mt-3 text-sm font-bold text-ocean-400">
                    {d.from_price ? `from ${money(d.from_price)}` : 'See details'}
                    <span className="ml-2 text-xs font-medium text-white/60">· {d.nights} nights</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Featured cruises ---------- */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ocean-600">Hand-picked</p>
              <h2 className="mt-1 font-display text-3xl font-bold text-navy-900">Featured cruises</h2>
            </div>
            <Link to="/cruises" className="text-sm font-bold text-ocean-600 hover:underline">Browse all →</Link>
          </div>
          {!featured ? <Spinner /> : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {featured.slice(0, 6).map((c) => <CruiseCard key={c.id} c={c} />)}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Destinations ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ocean-600">Where to next?</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-navy-900">Popular destinations</h2>
        {!dests ? <Spinner /> : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {dests.slice(0, 10).map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`}
                className="group relative h-44 overflow-hidden rounded-2xl shadow-md">
                <img src={d.image_url} alt={d.name} loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <p className="font-extrabold text-white">{d.name}</p>
                  <p className="text-xs text-white/70">{d.region}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Cruise lines ---------- */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ocean-600">Sail with the best</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-navy-900">Top cruise lines</h2>
          {!lines ? <Spinner /> : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {lines.slice(0, 10).map((l) => (
                <Link key={l.id} to={`/cruise-lines/${l.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-ocean-300 hover:shadow-lg">
                  <p className="font-extrabold text-navy-900 group-hover:text-ocean-600">{l.name}</p>
                  <p className="mt-1 text-xs italic text-slate-500">“{l.tagline}”</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Rating value={l.rating} size="h-3 w-3" />
                    <span className="text-xs font-semibold text-slate-500">{l.ship_count} ships</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section className="bg-navy-900 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-display text-3xl font-bold text-white">Why book with TravelOne</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z', 'Best price guarantee', 'Find a lower fare within 24 hours of booking and we\'ll match it.'],
              ['M2 3.5A1.5 1.5 0 0 1 3.5 2h1.15a1.5 1.5 0 0 1 1.46 1.17l.72 3.23a1.5 1.5 0 0 1-1.05 1.77l-.93.27c-.41.12-.64.55-.48.95a11.54 11.54 0 0 0 6.25 6.25c.4.16.84-.07.95-.48l.27-.93a1.5 1.5 0 0 1 1.77-1.05l3.22.72A1.5 1.5 0 0 1 18 15.35V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.15 0-2.26-.15-3.33-.43A13.02 13.02 0 0 1 2.43 8.33 13.02 13.02 0 0 1 2 5V3.5z', 'Expert cruise agents', 'Real humans, 7 days a week — call, chat or email anytime.'],
              ['M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 4v4.59l3.2 3.2-1.4 1.4L9 11.4V6h2z', 'Flexible booking', 'Low deposits and free date changes on most fares.'],
              ['M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 0 0 .95.69h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.45a1 1 0 0 0-.36 1.12l1.28 3.95c.3.93-.75 1.7-1.54 1.12l-3.36-2.44a1 1 0 0 0-1.18 0l-3.36 2.44c-.78.58-1.84-.2-1.54-1.12l1.29-3.95a1 1 0 0 0-.37-1.12L2.08 9.39c-.78-.57-.38-1.81.59-1.81h4.16a1 1 0 0 0 .95-.69l1.28-3.96z', 'Transparent pricing', 'Taxes and fees shown up front. No surprise charges.'],
            ].map(([path, title, text]) => (
              <div key={title} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ocean-500/15 text-ocean-400">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg>
                </span>
                <p className="mt-4 font-extrabold text-white">{title}</p>
                <p className="mt-1.5 text-sm text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center font-display text-3xl font-bold text-navy-900">Loved by cruisers</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ['“The filter tools made it so easy to compare Mediterranean sailings. Booked our Costa Diadema cruise in 15 minutes.”', 'Priya S.', 'Mediterranean, Costa Diadema'],
            ['“Best price we found anywhere, and the itinerary view is crystal clear. The Alaska sailing was unforgettable.”', 'Marcus T.', 'Alaska, Norwegian Encore'],
            ['“Booking was seamless and the confirmation email had everything. We\'ll never book cruises anywhere else.”', 'Elena & Rob', 'Caribbean, Wonder of the Seas'],
          ].map(([quote, name, trip]) => (
            <figure key={name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Rating value={5} />
              <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">{quote}</blockquote>
              <figcaption className="mt-4">
                <p className="text-sm font-bold text-navy-900">{name}</p>
                <p className="text-xs text-slate-500">{trip}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
