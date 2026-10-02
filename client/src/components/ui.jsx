import { Link } from 'react-router-dom';

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-500">
      <svg className="h-8 w-8 animate-spin text-ocean-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
      </svg>
      <p className="mt-3 text-sm font-medium">{label}</p>
    </div>
  );
}

export function PageHero({ title, subtitle, image, crumbs = [] }) {
  return (
    <div className="relative overflow-hidden bg-navy-900">
      {image && (
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/60 to-navy-900/40" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
        {crumbs.length > 0 && (
          <nav className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/60">
            <Link to="/" className="hover:text-ocean-400">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.to ? <Link to={c.to} className="hover:text-ocean-400">{c.label}</Link> : <span className="text-white/90">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-3xl font-bold text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">{subtitle}</p>}
      </div>
    </div>
  );
}

export function ErrorState({ message = 'Something went wrong.', retry }) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="text-4xl">⚠️</p>
      <p className="mt-3 font-bold text-navy-900">{message}</p>
      {retry && (
        <button onClick={retry} className="mt-4 rounded-xl bg-ocean-500 px-5 py-2 text-sm font-bold text-white hover:bg-ocean-600">
          Try again
        </button>
      )}
    </div>
  );
}
