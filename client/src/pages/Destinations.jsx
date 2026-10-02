import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDestinations } from '../api.js';
import { PageHero, Spinner } from '../components/ui.jsx';

export default function Destinations() {
  const [dests, setDests] = useState(null);
  useEffect(() => { getDestinations().then(setDests).catch(() => setDests([])); }, []);

  return (
    <div>
      <PageHero title="Destinations" subtitle="From Caribbean beaches to Alaskan glaciers — pick your horizon."
        image="https://picsum.photos/seed/dest-hero/1920/500"
        crumbs={[{ label: 'Destinations' }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {!dests ? <Spinner /> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dests.map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`}
                className="group relative h-60 overflow-hidden rounded-2xl shadow-md">
                <img src={d.image_url} alt={d.name} loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-ocean-400">{d.region}</p>
                  <p className="mt-0.5 text-xl font-extrabold text-white">{d.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-white/70">{d.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
