import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { adminDelete, adminList } from '../../admin/api.js';
import { RESOURCES } from '../../admin/resources.js';
import { useLookups } from '../../admin/useLookups.js';
import { ErrorState, Spinner } from '../../components/ui.jsx';

const PAGE_SIZE = 15;
const fmtDate = (v) => (v ? String(v).slice(0, 10) : '—');

export default function ResourceList() {
  const { resource } = useParams();
  const cfg = RESOURCES[resource];
  const [sp] = useSearchParams();
  const cruiseId = sp.get('cruise_id');
  const navigate = useNavigate();

  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const lookups = useLookups();

  const load = () => {
    setErr(null);
    adminList(resource, cruiseId ? { cruise_id: cruiseId } : {})
      .then(setRows)
      .catch((e) => setErr(e.response?.status === 401 ? 'Not authorized — please sign in again.' : 'Failed to load.'));
  };
  useEffect(load, [resource, cruiseId]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
  }, [rows, search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const view = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const del = async (row) => {
    if (!window.confirm(`Delete this ${cfg.singular}? This cannot be undone.`)) return;
    await adminDelete(resource, row.id);
    load();
  };

  if (!cfg) return <ErrorState message="Unknown resource." />;
  if (err) return <ErrorState message={err} retry={() => navigate('/admin/login')} />;

  const cell = (row, col) => {
    const v = col.render ? col.render(row) : row[col.key];
    if (col.ref) return lookups[col.ref]?.[v] ?? (v ?? '—');
    if (col.type === 'date') return fmtDate(v);
    if (col.type === 'bool') return v ? <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">Yes</span> : <span className="text-slate-400">—</span>;
    if (col.key === 'status') return <span className={`rounded px-2 py-0.5 text-xs font-bold ${v === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : v === 'CANCELLED' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>{v}</span>;
    return v ?? '—';
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">{cfg.label}</h1>
          {cruiseId && (
            <p className="mt-1 text-sm text-slate-500">
              Filtered to cruise #{cruiseId}{' '}
              <Link to={`/admin/${resource}`} className="font-bold text-ocean-600 hover:underline">clear</Link>
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search…"
            className="rounded-xl border border-slate-300 px-3.5 py-2 text-sm outline-none focus:border-ocean-500" />
          {!cfg.noCreate && (
            <Link to={`/admin/${resource}/new${cruiseId ? `?cruise_id=${cruiseId}` : ''}`}
              className="rounded-xl bg-ocean-500 px-4 py-2 text-sm font-bold text-white hover:bg-ocean-600">
              + New
            </Link>
          )}
        </div>
      </div>

      {!rows ? <Spinner /> : (
        <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                {cfg.columns.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-500">{c.label}</th>
                ))}
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {view.length === 0 && (
                <tr><td colSpan={cfg.columns.length + 1} className="px-4 py-10 text-center text-slate-500">No records.</td></tr>
              )}
              {view.map((row) => (
                <tr key={row.id ?? row.booking_ref} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  {cfg.columns.map((c) => (
                    <td key={c.key} className="max-w-[240px] truncate px-4 py-3 text-slate-700">{cell(row, c)}</td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link to={`/admin/${resource}/${row.id}/edit`} className="mr-3 text-xs font-bold text-ocean-600 hover:underline">Edit</Link>
                    <button onClick={() => del(row)} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-lg text-xs font-bold ${p === page ? 'bg-navy-800 text-white' : 'text-navy-700 hover:bg-slate-200'}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
