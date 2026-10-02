export default function Rating({ value = 0, size = 'h-3.5 w-3.5' }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`${size} ${i <= Math.round(value) ? 'text-sand-500' : 'text-slate-300'}`} fill="currentColor">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.96a1 1 0 0 0 .95.69h4.16c.97 0 1.37 1.24.59 1.81l-3.37 2.45a1 1 0 0 0-.36 1.12l1.28 3.95c.3.93-.75 1.7-1.54 1.12l-3.36-2.44a1 1 0 0 0-1.18 0l-3.36 2.44c-.78.58-1.84-.2-1.54-1.12l1.29-3.95a1 1 0 0 0-.37-1.12L2.08 9.39c-.78-.57-.38-1.81.59-1.81h4.16a1 1 0 0 0 .95-.69l1.28-3.96z"/>
        </svg>
      ))}
    </span>
  );
}
