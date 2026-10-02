import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-6xl">🌊</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-navy-900">Lost at sea</h1>
      <p className="mt-2 text-slate-600">The page you're looking for has sailed away.</p>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-ocean-500 px-6 py-3 text-sm font-bold text-white hover:bg-ocean-600">
        Back to shore
      </Link>
    </div>
  );
}
