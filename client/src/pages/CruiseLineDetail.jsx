import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLine } from '../api.js';
import Rating from '../components/Rating.jsx';
import { money } from '../components/CruiseCard.jsx';
import { ErrorState, PageHero, Spinner } from '../components/ui.jsx';

export default function CruiseLineDetail() {
  const { slug } = useParams();
  const [line, setLine] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLine(null); setErr(null);
    getLine(slug).then(setLine).catch(() => setErr('Cruise line not found.'));
  }, [slug]);

  if (err) return <ErrorState message={err} />;
  if (!line) return <Spinner />;

  return (
    <div>
      <PageHero title={line.name} subtitle={line.description}
        crumbs={[{ label: 'Cruise Lines', to: '/cruise-lines' }, { label: line.name }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Rating value={line.rating} size="h-5 w-5" />
            <span className="text-sm font-semibold text-slate-600">{line.rating} overall · {line.ship_count} ships</span>
          </div>
          <Link to={`/cruises?line=${line.id}`}
            className="rounded-xl bg-ocean-500 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-ocean-600">
            View {line.name} cruises
          </Link>
        </div>

        <h2 className="font-display text-2xl font-bold text-navy-900">Fleet</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {line.ships.map((s) => (
            <Link key={s.id} to={`/ships/${s.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-44 overflow-hidden">
                <img src={s.image_url} alt={s.name} loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-navy-900 group-hover:text-ocean-600">{s.name}</p>
                  <Rating value={s.rating} size="h-3 w-3" />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {s.passenger_capacity?.toLocaleString()} guests · {s.year_built}{s.year_refurbished ? ` · refit ${s.year_refurbished}` : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
