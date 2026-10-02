import { Link } from 'react-router-dom';
import { GUIDES } from '../guides.js';
import { toDate } from '../utils.js';
import { PageHero } from '../components/ui.jsx';

const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function Guides() {
  return (
    <div>
      <PageHero title="Cruise Guides" subtitle="Honest advice from cruise obsessives — planning tips, destination deep-dives and money-saving strategies."
        image="https://picsum.photos/seed/guides-hero/1920/500"
        crumbs={[{ label: 'Guides' }]} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {GUIDES.map((g, i) => (
            <Link key={g.slug} to={`/guides/${g.slug}`}
              className={`group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl ${i === 0 ? 'md:col-span-2 md:flex' : ''}`}>
              <div className={`${i === 0 ? 'md:w-1/2 h-56 md:h-auto' : 'h-48'} overflow-hidden`}>
                <img src={g.image} alt={g.title} loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-ocean-100 px-2.5 py-1 font-bold text-ocean-600">{g.category}</span>
                  <span className="text-slate-400">{fmt.format(toDate(g.date))}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-navy-900 group-hover:text-ocean-600">{g.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.excerpt}</p>
                <p className="mt-3 text-sm font-bold text-ocean-600">Read guide →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
