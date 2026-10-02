import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { getFilters } from '../api.js';
import { SITE } from '../site.js';

const Anchor = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0-1.5A4 4 0 0 0 8 4.5c0 .63.15 1.23.4 1.77L7 8l-4.5 1.6L4 12c-1 4.6 2.4 8.4 7 9.4V23h2v-1.6c4.6-1 8-4.8 7-9.4l1.5-2.4L17 8l-1.4-1.73A4 4 0 0 0 12 .5zm-7 11.6 6-2.1V20c-3.2-.7-6-3.9-6-7.9zm14 0c0 4-2.8 7.2-6 7.9v-10l6 2.1z"/>
  </svg>
);

const navLink = ({ isActive }) =>
  `px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
    isActive ? 'text-ocean-400' : 'text-white/90 hover:text-white hover:bg-white/10'
  }`;

function Dropdown({ label, items, base }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink to={base} className={navLink}>
        {label}
        <svg className="ml-1 inline h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" clipRule="evenodd"/></svg>
      </NavLink>
      {open && (
        <div className="absolute left-0 top-full z-50 w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 max-h-80 overflow-y-auto scroll-thin">
          {items.map((it) => (
            <Link key={it.slug} to={`${base}/${it.slug}`}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-ocean-50 hover:text-ocean-600">
              {it.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [meta, setMeta] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { getFilters().then(setMeta).catch(() => {}); }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* top utility strip */}
      <div className="bg-navy-950 text-white/80">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <p className="hidden sm:block tracking-wide">Best price guarantee · Rated 4.8 by cruisers</p>
          <div className="flex items-center gap-4">
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 font-semibold text-white hover:text-ocean-400">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5z"/></svg>
              {SITE.phone}
            </a>
            <Link to="/contact" className="hover:text-ocean-400">Contact</Link>
            <Link to="/my-bookings" className="hover:text-ocean-400">My Bookings</Link>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="bg-navy-900 shadow-lg shadow-navy-950/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 text-white shadow-md">
              <Anchor className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Travel<span className="text-ocean-400">One</span>
              <span className="ml-1.5 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:inline">Cruises</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/cruises" className={navLink} end>All Cruises</NavLink>
            {meta && <Dropdown label="Cruise Lines" items={meta.lines} base="/cruise-lines" />}
            {meta && <Dropdown label="Destinations" items={meta.destinations} base="/destinations" />}
            <NavLink to="/deals" className={navLink}>
              Deals
              <span className="ml-1.5 rounded-full bg-sand-500 px-1.5 py-0.5 text-[10px] font-bold text-navy-950">HOT</span>
            </NavLink>
            <NavLink to="/guides" className={navLink}>Guides</NavLink>
          </nav>

          <div className="hidden lg:block">
            <Link to="/cruises" className="rounded-xl bg-ocean-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-ocean-400">
              Find a Cruise
            </Link>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
            {[['All Cruises', '/cruises'], ['Cruise Lines', '/cruise-lines'], ['Destinations', '/destinations'], ['Deals', '/deals'], ['Guides', '/guides'], ['Contact', '/contact'], ['My Bookings', '/my-bookings']].map(([label, to]) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-semibold text-white/90 hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
