import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCruises, getDestination } from '../api.js';
import CruiseCard from '../components/CruiseCard.jsx';
import { ErrorState, PageHero, Spinner } from '../components/ui.jsx';

export default function DestinationDetail() {
  const { slug } = useParams();
  const [dest, setDest] = useState(null);
  const [cruises, setCruises] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setDest(null); setCruises(null); setErr(null);
    getDestination(slug)
      .then((d) => {
        setDest(d);
        return getCruises({ destination: d.id, sort: 'date_asc', page_size: 12 });
      })
      .then((r) => setCruises(r.data))
      .catch(() => setErr('Destination not found.'));
  }, [slug]);

  if (err) return <ErrorState message={err} />;
  if (!dest) return <Spinner />;

  return (
    <div>
      <PageHero title={dest.name} subtitle={dest.description} image={dest.image_url}
        crumbs={[{ label: 'Destinations', to: '/destinations' }, { label: dest.name }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-navy-900">Upcoming sailings</h2>
          <Link to={`/cruises?destination=${dest.id}`} className="text-sm font-bold text-ocean-600 hover:underline">
            View all with filters →
          </Link>
        </div>
        {!cruises ? <Spinner /> : cruises.length === 0 ? (
          <p className="text-slate-500">No upcoming sailings for this destination right now.</p>
        ) : (
          <div className="space-y-5">{cruises.map((c) => <CruiseCard key={c.id} c={c} />)}</div>
        )}
      </div>
    </div>
  );
}
