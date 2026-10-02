import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { adminCreate, adminGet, adminList, adminUpdate } from '../../admin/api.js';
import { RESOURCES } from '../../admin/resources.js';
import { ErrorState, Spinner } from '../../components/ui.jsx';

const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100';

// fetch option lists for ref/multiref fields, once per table
const optCache = {};
const loadOpts = (table) => {
  if (!optCache[table]) optCache[table] = adminList(table);
  return optCache[table];
};

export default function ResourceForm() {
  const { resource, id } = useParams();
  const isNew = id === undefined || id === 'new';
  const cfg = RESOURCES[resource];
  const [sp] = useSearchParams();
  const cruiseId = sp.get('cruise_id');
  const navigate = useNavigate();

  const [row, setRow] = useState(isNew ? {} : null);
  const [options, setOptions] = useState({});
  const [err, setErr] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setErr(null);
    // load ref options
    const tables = new Set();
    cfg?.fields.forEach((f) => (f.ref && tables.add(f.ref)));
    cfg?.columns.forEach((c) => (c.ref && tables.add(c.ref)));
    Promise.all([...tables].map((t) => loadOpts(t).then((rows) => [t, rows])))
      .then((entries) => setOptions((o) => ({ ...o, ...Object.fromEntries(entries) })))
      .catch(() => {});

    if (!isNew) {
      adminGet(resource, id).then(setRow).catch(() => setErr('Record not found.'));
    } else {
      const init = {};
      if (cfg?.child === 'cruise_id' && cruiseId) init.cruise_id = Number(cruiseId);
      if (resource === 'deals' && cruiseId) init.cruise_id = Number(cruiseId);
      setRow(init);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, id, cruiseId]);

  if (!cfg) return <ErrorState message="Unknown resource." />;
  if (err) return <ErrorState message={err} />;
  if (row === null) return <Spinner />;

  const set = (key, val) => setRow((r) => ({ ...r, [key]: val }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true); setErr(null);
    const payload = {};
    cfg.fields.forEach((f) => {
      let v = row[f.key];
      if (v === undefined || v === '') { payload[f.key] = f.type === 'checkbox' ? !!v : (f.type === 'multiref' ? [] : null); return; }
      if (f.type === 'number') v = Number(v);
      if (f.type === 'checkbox') v = !!v;
      if (f.type === 'ref' && v !== null) v = Number(v);
      payload[f.key] = v;
    });
    try {
      if (isNew) await adminCreate(resource, payload);
      else await adminUpdate(resource, id, payload);
      navigate(`/admin/${resource}${cruiseId ? `?cruise_id=${cruiseId}` : ''}`);
    } catch (e2) {
      setErr(e2.response?.data?.error || 'Save failed.');
      setSaving(false);
    }
  };

  const dateVal = (v) => (v ? String(v).slice(0, 10) : '');

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          {isNew ? `New ${cfg.singular}` : `Edit ${cfg.singular} #${id}`}
        </h1>
        <Link to={`/admin/${resource}${cruiseId ? `?cruise_id=${cruiseId}` : ''}`}
          className="text-sm font-bold text-ocean-600 hover:underline">← Back to {cfg.label}</Link>
      </div>

      {!isNew && cfg.children && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cfg.children.map((ch) => (
            <Link key={ch.resource} to={`/admin/${ch.resource}?cruise_id=${id}`}
              className="rounded-lg bg-navy-800 px-4 py-2 text-xs font-bold text-white hover:bg-navy-700">
              Manage {ch.label} →
            </Link>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 sm:grid-cols-2">
          {cfg.fields.map((f) => {
            const wide = f.type === 'textarea' || f.type === 'multiref';
            return (
              <div key={f.key} className={wide ? 'sm:col-span-2' : ''}>
                {f.type !== 'checkbox' && (
                  <label className="mb-1 block text-sm font-semibold text-slate-600">
                    {f.label}{f.required && <span className="text-red-500"> *</span>}
                  </label>
                )}

                {f.type === 'textarea' && (
                  <textarea rows={3} className={inputCls} value={row[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} />
                )}
                {f.type === 'text' && (
                  <input className={inputCls} value={row[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} required={f.required} />
                )}
                {f.type === 'number' && (
                  <input type="number" step={f.step || '1'} className={inputCls} value={row[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} required={f.required} />
                )}
                {f.type === 'date' && (
                  <input type="date" className={inputCls} value={dateVal(row[f.key])} onChange={(e) => set(f.key, e.target.value)} required={f.required} />
                )}
                {f.type === 'checkbox' && (
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-3">
                    <input type="checkbox" checked={!!row[f.key]} onChange={(e) => set(f.key, e.target.checked)}
                      className="h-4 w-4 accent-ocean-500" />
                    <span className="text-sm font-semibold text-slate-700">{f.label}</span>
                  </label>
                )}
                {f.type === 'select' && (
                  <select className={inputCls} value={row[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} required={f.required}>
                    <option value="">—</option>
                    {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                )}
                {f.type === 'ref' && (
                  <select className={inputCls} value={row[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} required={f.required}>
                    <option value="">—</option>
                    {(options[f.ref] || []).map((o) => (
                      <option key={o.id} value={o.id}>{o.name || o.title || `#${o.id}`}</option>
                    ))}
                  </select>
                )}
                {f.type === 'multiref' && (
                  <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 p-3 sm:grid-cols-3">
                    {(options[f.ref] || []).map((o) => {
                      const cur = Array.isArray(row[f.key]) ? row[f.key] : [];
                      const on = cur.includes(o.id);
                      return (
                        <label key={o.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-ocean-50">
                          <input type="checkbox" checked={on}
                            onChange={() => set(f.key, on ? cur.filter((x) => x !== o.id) : [...cur, o.id])}
                            className="h-4 w-4 accent-ocean-500" />
                          {o.name}
                        </label>
                      );
                    })}
                  </div>
                )}
                {f.hint && <p className="mt-1 text-xs text-slate-400">{f.hint}</p>}
              </div>
            );
          })}
        </div>

        {err && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">{err}</p>}

        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={saving}
            className="flex-1 rounded-xl bg-ocean-500 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-ocean-600 disabled:opacity-50">
            {saving ? 'Saving…' : isNew ? 'Create' : 'Save changes'}
          </button>
          <Link to={`/admin/${resource}${cruiseId ? `?cruise_id=${cruiseId}` : ''}`}
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-navy-800">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
