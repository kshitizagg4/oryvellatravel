import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminPing } from '../../admin/api.js';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    localStorage.setItem('admin_key', key);
    try {
      await adminPing();
      navigate('/admin');
    } catch {
      localStorage.removeItem('admin_key');
      setErr('Invalid admin key.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <form onSubmit={submit} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h1 className="font-display text-2xl font-bold text-navy-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Enter the admin key configured on the server (<code>ADMIN_KEY</code>).</p>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key" autoFocus
          className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100" />
        {err && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">{err}</p>}
        <button disabled={busy}
          className="mt-4 w-full rounded-xl bg-navy-800 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-navy-700 disabled:opacity-50">
          {busy ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
