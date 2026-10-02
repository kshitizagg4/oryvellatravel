import { useMemo, useState } from 'react';
import { monthLabel } from './SearchWidget.jsx';

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200 py-4 last:border-0">
      <button type="button" onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-bold text-navy-900">
        {title}
        <svg className={`h-4 w-4 text-slate-400 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" clipRule="evenodd"/>
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function CheckList({ items, selected, onToggle }) {
  return (
    <ul className="max-h-56 space-y-1 overflow-y-auto pr-1 scroll-thin">
      {items.map((it) => (
        <li key={it.id}>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-ocean-50">
            <input type="checkbox" checked={selected.includes(it.id)} onChange={() => onToggle(it.id)}
              className="h-4 w-4 rounded border-slate-300 text-ocean-500 accent-ocean-500" />
            <span className="truncate">{it.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function FilterSidebar({ meta, params, setParams }) {
  const selected = (key) => (params.get(key) ? params.get(key).split(',').map(Number) : []);
  const toggle = (key) => (id) => {
    const cur = selected(key);
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    setParams({ [key]: next.length ? next.join(',') : null, page: null });
  };

  const selectedLines = selected('line');
  const visibleShips = useMemo(
    () => (selectedLines.length ? meta.ships.filter((s) => selectedLines.includes(s.cruise_line_id)) : meta.ships),
    [meta.ships, selectedLines.join(',')],
  );

  const [price, setPrice] = useState({ min: params.get('price_min') || '', max: params.get('price_max') || '' });

  return (
    <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-navy-900">Filter Results</h2>
        <button onClick={() => setParams(null, true)}
          className="text-xs font-bold text-ocean-600 hover:underline">Clear all</button>
      </div>

      <Section title="Cruise Line">
        <CheckList items={meta.lines} selected={selectedLines} onToggle={toggle('line')} />
      </Section>

      <Section title="Ship">
        <CheckList items={visibleShips} selected={selected('ship')} onToggle={toggle('ship')} />
      </Section>

      <Section title="Departure Port">
        <CheckList items={meta.ports} selected={selected('port')} onToggle={toggle('port')} />
      </Section>

      <Section title="Departure Month">
        <CheckList
          items={meta.months.map((m) => ({ id: m, name: monthLabel(m) }))}
          selected={params.get('month') ? params.get('month').split(',') : []}
          onToggle={(m) => {
            const cur = params.get('month') ? params.get('month').split(',') : [];
            const next = cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m];
            setParams({ month: next.length ? next.join(',') : null, page: null });
          }} />
      </Section>

      <Section title="Duration">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ['Any', null, null],
            ['Up to 4', null, 4],
            ['5 – 7', 5, 7],
            ['8 – 11', 8, 11],
            ['12+', 12, null],
          ].map(([label, lo, hi]) => {
            const active =
              String(lo ?? '') === (params.get('nights_min') || '') &&
              String(hi ?? '') === (params.get('nights_max') || '');
            return (
              <button key={label} type="button"
                onClick={() => setParams({ nights_min: lo, nights_max: hi, page: null })}
                className={`rounded-lg border px-2 py-2 font-semibold transition ${
                  active ? 'border-ocean-500 bg-ocean-50 text-ocean-600' : 'border-slate-200 text-slate-600 hover:border-ocean-300'}`}>
                {label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Price per person">
        <div className="flex items-center gap-2">
          <input type="number" min="0" placeholder={`$${Math.round(meta.min_price || 0)}`}
            value={price.min} onChange={(e) => setPrice({ ...price, min: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm outline-none focus:border-ocean-500" />
          <span className="text-slate-400">–</span>
          <input type="number" min="0" placeholder={`$${Math.round(meta.max_price || 0)}`}
            value={price.max} onChange={(e) => setPrice({ ...price, max: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm outline-none focus:border-ocean-500" />
        </div>
        <button type="button"
          onClick={() => setParams({ price_min: price.min || null, price_max: price.max || null, page: null })}
          className="mt-2 w-full rounded-lg bg-navy-800 py-2 text-sm font-bold text-white transition hover:bg-navy-700">
          Apply price
        </button>
      </Section>
    </aside>
  );
}
