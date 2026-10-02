import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCruises, getFilters } from '../api.js';
import CruiseCard from '../components/CruiseCard.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import Pagination from '../components/Pagination.jsx';
import { monthLabel } from '../components/SearchWidget.jsx';
import { ErrorState, Spinner } from '../components/ui.jsx';

const SORTS = [
  ['date_asc', 'Departure: soonest'],
  ['price_asc', 'Price: low to high'],
  ['price_desc', 'Price: high to low'],
  ['nights_asc', 'Duration: shortest'],
  ['nights_desc', 'Duration: longest'],
  ['rating_desc', 'Ship rating'],
];

export default function Cruises() {
  const [params, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { getFilters().then(setMeta).catch(() => setMeta(null)); }, []);

  const query = useMemo(() => Object.fromEntries(params.entries()), [params]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getCruises({ ...query, page_size: 10 })
      .then((r) => !cancelled && setResult(r))
      .catch(() => !cancelled && setError('Could not load cruises.'))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [params]);

  // update helper: {key: value|null} — null removes; passing null entirely clears
  const setParams = (updates, clearAll = false) => {
    if (clearAll) return setSearchParams({});
    const next = new URLSearchParams(params);
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === undefined || v === '') next.delete(k);
      else next.set(k, String(v));
    });
    setSearchParams(next);
  };

  const activeChips = useMemo(() => {
    if (!meta) return [];
    const chips = [];
    const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x.name]));
    const lineNames = byId(meta.lines), shipNames = byId(meta.ships), portNames = byId(meta.ports), destNames = byId(meta.destinations);
    const push = (label, key, id) => chips.push({ label, clear: () => {
      const cur = params.get(key)?.split(',') ?? [];
      const next = cur.filter((x) => x !== String(id));
      setParams({ [key]: next.length ? next.join(',') : null, page: null });
    }});

    (params.get('destination')?.split(',') ?? []).forEach((id) => push(destNames[id] || `Destination`, 'destination', id));
    (params.get('line')?.split(',') ?? []).forEach((id) => push(lineNames[id] || `Line`, 'line', id));
    (params.get('ship')?.split(',') ?? []).forEach((id) => push(shipNames[id] || `Ship`, 'ship', id));
    (params.get('port')?.split(',') ?? []).forEach((id) => push(portNames[id] || `Port`, 'port', id));
    (params.get('month')?.split(',') ?? []).forEach((m) => push(monthLabel(m), 'month', m));
    if (params.get('q')) chips.push({ label: `“${params.get('q')}”`, clear: () => setParams({ q: null, page: null }) });
    if (params.get('nights_min') || params.get('nights_max')) chips.push({
      label: `${params.get('nights_min') || '0'}–${params.get('nights_max') || '∞'} nights`,
      clear: () => setParams({ nights_min: null, nights_max: null, page: null }),
    });
    if (params.get('price_min') || params.get('price_max')) chips.push({
      label: `$${params.get('price_min') || '0'}–$${params.get('price_max') || '∞'}`,
      clear: () => setParams({ price_min: null, price_max: null, page: null }),
    });
    return chips;
  }, [params, meta]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy-900">Cruise Search Results</h1>
          <p className="mt-1 text-sm text-slate-500">
            {result ? `${result.total} cruise${result.total === 1 ? '' : 's'} found` : 'Searching…'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-navy-800 lg:hidden"
            onClick={() => setFiltersOpen(!filtersOpen)}>
            {filtersOpen ? 'Hide filters' : 'Filters'}
          </button>
          <select value={params.get('sort') || 'date_asc'} onChange={(e) => setParams({ sort: e.target.value })}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-navy-800 outline-none focus:border-ocean-500">
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeChips.map((chip, i) => (
            <button key={i} onClick={chip.clear}
              className="inline-flex items-center gap-1.5 rounded-full bg-ocean-100 px-3 py-1.5 text-xs font-bold text-ocean-600 hover:bg-ocean-200">
              {chip.label}
              <span className="text-ocean-600/60">✕</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          {meta && <FilterSidebar meta={meta} params={params} setParams={setParams} />}
        </div>

        <div>
          {loading ? <Spinner label="Finding cruises…" /> :
            error ? <ErrorState message={error} retry={() => setParams({})} /> :
            result?.data.length === 0 ? (
              <div className="rounded-2xl bg-white p-14 text-center shadow-sm ring-1 ring-slate-200">
                <p className="text-4xl">🛳️</p>
                <p className="mt-3 font-bold text-navy-900">No cruises match your filters</p>
                <p className="mt-1 text-sm text-slate-500">Try removing a filter or two.</p>
                <button onClick={() => setParams(null, true)}
                  className="mt-4 rounded-xl bg-ocean-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-ocean-600">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-5">
                  {result.data.map((c) => <CruiseCard key={c.id} c={c} />)}
                </div>
                <Pagination page={result.page} totalPages={result.totalPages}
                  onChange={(p) => { setParams({ page: p }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
              </>
            )}
        </div>
      </div>
    </div>
  );
}
