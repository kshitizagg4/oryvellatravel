import { Link, useParams } from 'react-router-dom';
import { GUIDES } from '../guides.js';
import { toDate } from '../utils.js';
import { PageHero, ErrorState } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return <ErrorState message="Guide not found." />;

  return (
    <div>
      <PageHero title={guide.title} image={guide.image}
        crumbs={[{ label: 'Guides', to: '/guides' }, { label: guide.title }]}
        subtitle={`${guide.category} · ${fmt.format(toDate(guide.date))}`} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        {guide.body.map((para, i) => (
          <p key={i} className="mt-5 text-[15px] leading-7 text-slate-700 first:mt-0 first:text-lg first:leading-8">{para}</p>
        ))}
        <div className="mt-10 rounded-2xl bg-navy-900 p-6 text-center">
          <p className="font-display text-xl font-bold text-white">Ready to sail?</p>
          <p className="mt-1 text-sm text-white/70">Browse 50+ itineraries with transparent pricing.</p>
          <Link to="/cruises" className="mt-4 inline-block rounded-xl bg-ocean-500 px-6 py-3 text-sm font-bold text-white hover:bg-ocean-400">
            Search cruises
          </Link>
        </div>
      </article>
    </div>
  );
}
