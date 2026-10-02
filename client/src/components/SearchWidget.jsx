import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilters } from '../api.js';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function monthLabel(ym) {
  const [y, m] = ym.split('-');
  return `${MONTH_NAMES[Number(m) - 1]} ${y}`;
}

const selectCls =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100';

export default function SearchWidget({ compact = false }) {
  const [meta, setMeta] = useState(null);
  const [form, setForm] = useState({ destination: '', line: '', month: '', nights: '', q: '' });
  const navigate = useNavigate();

  useEffect(() => { getFilters().then(setMeta).catch(() => {}); }, []);

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.destination) params.set('destination', form.destination);
    if (form.line) params.set('line', form.line);
    if (form.month) params.set('month', form.month);
    if (form.q) params.set('q', form.q);
    if (form.nights) {
      const [lo, hi] = form.nights.split('-');
      if (lo) params.set('nights_min', lo);
      if (hi && hi !== '+') params.set('nights_max', hi);
    }
    navigate(`/cruises?${params.toString()}`);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={submit}
      className={`rounded-2xl bg-white/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur sm:p-5 ${compact ? '' : '-mt-16 relative z-10'}`}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Destination</label>
          <select className={selectCls} value={form.destination} onChange={set('destination')}>
            <option value="">Anywhere</option>
            {meta?.destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Departure</label>
          <select className={selectCls} value={form.month} onChange={set('month')}>
            <option value="">Any month</option>
            {meta?.months.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Cruise line</label>
          <select className={selectCls} value={form.line} onChange={set('line')}>
            <option value="">All lines</option>
            {meta?.lines.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Duration</label>
          <select className={selectCls} value={form.nights} onChange={set('nights')}>
            <option value="">Any length</option>
            <option value="-4">Up to 4 nights</option>
            <option value="5-7">5 – 7 nights</option>
            <option value="8-11">8 – 11 nights</option>
            <option value="12-+">12+ nights</option>
          </select>
        </div>
        <div className="flex items-end md:col-span-2 lg:col-span-1">
          <button type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sand-500 to-sand-600 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-sand-500/30 transition hover:brightness-110 active:scale-[0.98]">
            Search
          </button>
        </div>
      </div>
      <input
        className="mt-3 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
        placeholder="Or search by ship, port, or cruise name (e.g. Diadema, Miami, Caribbean…)"
        value={form.q} onChange={set('q')} />
    </form>
  );
}
