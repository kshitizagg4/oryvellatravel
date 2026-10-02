export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const push = (p) => !pages.includes(p) && p >= 1 && p <= totalPages && pages.push(p);
  [1, page - 1, page, page + 1, totalPages].forEach(push);
  const sorted = pages.sort((a, b) => a - b);
  const items = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push('…');
    items.push(p);
  });

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-ocean-50 disabled:opacity-40">
        ← Prev
      </button>
      {items.map((it, i) => it === '…'
        ? <span key={`e${i}`} className="px-2 text-slate-400">…</span>
        : (
          <button key={it} onClick={() => onChange(it)}
            className={`h-9 w-9 rounded-lg text-sm font-bold transition ${
              it === page ? 'bg-navy-800 text-white shadow' : 'text-navy-700 hover:bg-ocean-50'}`}>
            {it}
          </button>
        ))}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-ocean-50 disabled:opacity-40">
        Next →
      </button>
    </nav>
  );
}
