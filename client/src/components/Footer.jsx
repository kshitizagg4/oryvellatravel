import { Link } from 'react-router-dom';
import { SITE } from '../site.js';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="text-lg font-extrabold text-white">Travel<span className="text-ocean-400">One</span> Cruises</p>
          <p className="mt-3 text-sm leading-relaxed">Find and book your perfect cruise. Exclusive deals, expert advice and the best prices guaranteed.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-ocean-400" to="/cruises">All Cruises</Link></li>
            <li><Link className="hover:text-ocean-400" to="/cruise-lines">Cruise Lines</Link></li>
            <li><Link className="hover:text-ocean-400" to="/destinations">Destinations</Link></li>
            <li><Link className="hover:text-ocean-400" to="/deals">Last-Minute Deals</Link></li>
            <li><Link className="hover:text-ocean-400" to="/guides">Cruise Guides</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Popular</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-ocean-400" to="/cruises?destination=1">Caribbean Cruises</Link></li>
            <li><Link className="hover:text-ocean-400" to="/cruises?destination=3">Mediterranean Cruises</Link></li>
            <li><Link className="hover:text-ocean-400" to="/cruises?destination=5">Alaska Cruises</Link></li>
            <li><Link className="hover:text-ocean-400" to="/cruises?destination=8">Middle East Cruises</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-ocean-400" to="/about">About Us</Link></li>
            <li><Link className="hover:text-ocean-400" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-ocean-400" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-ocean-400" to="/terms">Terms of Service</Link></li>
            <li><Link className="hover:text-ocean-400" to="/admin">Admin</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-ocean-400" href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><a className="hover:text-ocean-400" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>{SITE.address}</li>
            <li>{SITE.hours}</li>
            <li><Link className="hover:text-ocean-400" to="/my-bookings">Manage my booking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
