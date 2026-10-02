import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLines } from '../api.js';
import Rating from '../components/Rating.jsx';
import { PageHero, Spinner } from '../components/ui.jsx';

export default function CruiseLines() {
  const [lines, setLines] = useState(null);
  useEffect(() => { getLines().then(setLines).catch(() => setLines([])); }, []);

  return (
    <div>
      <PageHero title="Cruise Lines" subtitle="Compare the world's best cruise brands — from family fun to modern luxury."
        image="https://picsum.photos/seed/lines-hero/1920/500"
        crumbs={[{ label: 'Cruise Lines' }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {!lines ? <Spinner /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lines.map((l) => (
              <Link key={l.id} to={`/cruise-lines/${l.slug}`}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:ring-ocean-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-navy-900 group-hover:text-ocean-600">{l.name}</h2>
                    <p className="mt-0.5 text-sm italic text-slate-500">“{l.tagline}”</p>
                  </div>
                  <Rating value={l.rating} size="h-3 w-3" />
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">{l.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{l.ship_count} ships</span>
                  <span className="text-sm font-bold text-ocean-600">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
