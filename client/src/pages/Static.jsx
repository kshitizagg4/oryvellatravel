import { SITE } from '../site.js';
import { PageHero } from '../components/ui.jsx';

const P = ({ children }) => <p className="mt-3 text-sm leading-relaxed text-slate-600">{children}</p>;
const H = ({ children }) => <h2 className="mt-8 font-display text-xl font-bold text-navy-900">{children}</h2>;

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: October 2026',
    body: (
      <>
        <P>{SITE.name} ("we", "us") respects your privacy. This policy explains what information we collect, why, and how you can control it.</P>
        <H>Information we collect</H>
        <P>Contact details you provide when booking or contacting us (name, email, phone); booking details (cruise, stateroom, guests); technical data such as IP address and browser type; and, if enabled, cookie/analytics identifiers.</P>
        <H>How we use it</H>
        <P>To process and manage your bookings, respond to inquiries, send booking confirmations and service updates, improve our website, and — only with your consent — send promotional offers.</P>
        <H>Sharing</H>
        <P>We share booking details with the cruise line you book with, as required to fulfil your reservation. We do not sell your personal data. We may share data with service providers (hosting, analytics) under confidentiality obligations.</P>
        <H>Cookies</H>
        <P>We use essential cookies for site functionality and may use analytics cookies to understand usage. You can disable cookies in your browser; some features may not work.</P>
        <H>Your rights</H>
        <P>You may request access to, correction of, or deletion of your personal data at any time by emailing {SITE.email}. We retain booking records as required for accounting and legal purposes.</P>
        <H>Contact</H>
        <P>Privacy questions: {SITE.email} · {SITE.address}.</P>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: October 2026',
    body: (
      <>
        <P>By using {SITE.name} you agree to these terms. Please read them carefully.</P>
        <H>Our role</H>
        <P>{SITE.name} acts as a cruise booking intermediary. Your cruise contract is with the cruise line; their ticket contract and policies apply to your sailing.</P>
        <H>Pricing & availability</H>
        <P>Fares shown are per person, based on double occupancy, and are subject to availability until your booking is confirmed. Taxes, port fees and gratuities may be additional unless stated. Promotional fares may carry restrictions.</P>
        <H>Bookings & cancellation</H>
        <P>Bookings are confirmed by email with a reference number. Cancellation and change terms depend on the cruise line and fare type; applicable fees are displayed before you confirm. Free-cancellation windows, where offered, apply to qualifying fares only.</P>
        <H>Your responsibilities</H>
        <P>You are responsible for accurate passenger details, valid travel documents (passport, visas) and compliance with embarkation requirements. We are not liable for denied boarding due to incomplete documentation.</P>
        <H>Acceptable use</H>
        <P>Do not misuse this site — no scraping, no fraudulent bookings, no interference with the service. We may cancel bookings made in violation.</P>
        <H>Liability</H>
        <P>To the extent permitted by law, {SITE.name} is not liable for cruise line schedule changes, cancellations, or events beyond our control. Nothing in these terms limits liability that cannot be limited by law.</P>
        <H>Contact</H>
        <P>Questions about these terms: {SITE.email}.</P>
      </>
    ),
  },
  about: {
    title: `About ${SITE.name}`,
    updated: null,
    body: (
      <>
        <P>{SITE.name} is an independent cruise booking platform founded in {SITE.founded}. We compare sailings across the world's leading cruise lines so you can find the right voyage at the right price — without bouncing between a dozen line websites.</P>
        <H>What we do</H>
        <P>Our catalog covers Caribbean, Mediterranean, Alaska, Northern Europe, Middle East and transoceanic sailings aboard every major brand — from family favorites like Disney and Carnival to premium lines like Celebrity and Virgin Voyages.</P>
        <H>How we're different</H>
        <P>Transparent pricing with taxes shown up front, a powerful filter-first search experience, real itinerary detail, and human cruise experts available {SITE.hours}.</P>
        <H>Talk to us</H>
        <P>{SITE.address} · {SITE.phone} · {SITE.email}</P>
      </>
    ),
  },
};

export default function StaticPage({ page }) {
  const c = CONTENT[page];
  return (
    <div>
      <PageHero title={c.title} crumbs={[{ label: c.title }]} />
      <div className="mx-auto max-w-3xl px-4 py-10">
        {c.updated && <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{c.updated}</p>}
        {c.body}
      </div>
    </div>
  );
}
