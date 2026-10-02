# TravelOne Cruises

A CruiseDirect-style cruise search & booking app.

- **client/** — React (Vite) + Tailwind CSS v4 + React Router
- **server/** — Node.js + Express + `mssql`
- **database/** — `schema.sql` + `seed.sql` for SQL Server

## Quick start (demo data, no DB needed)

```bash
cd server && npm install && npm run dev      # API on :4000
cd client && npm install && npm run dev      # App on :5173
```

The server's `.env` ships with `DB_DRIVER=memory`, which serves a built-in
dataset so you can explore the app immediately.

## Connecting your SQL Server

1. Create the database and tables:

   ```bash
   sqlcmd -S <your-server> -U <user> -P <password> -i database/schema.sql
   sqlcmd -S <your-server> -U <user> -P <password> -i database/seed.sql
   ```

   Or run both files in SSMS / Azure Data Studio.

2. Edit `server/.env`:

   ```
   DB_DRIVER=mssql
   DB_SERVER=localhost
   DB_PORT=1433
   DB_NAME=CruiseDB
   DB_USER=sa
   DB_PASSWORD=yourpassword
   DB_ENCRYPT=false        # true for Azure SQL
   DB_TRUST_CERT=true      # false for Azure SQL
   ```

3. Restart `npm run dev` in `server/`. If SQL Server is unreachable the API
   falls back to the in-memory dataset and logs a warning — check
   `GET /api/health` (`driver` field) to see which is active.

## API surface

| Endpoint | Description |
|---|---|
| `GET /api/cruises` | List w/ filters: `destination,line,ship,port,month,nights_min,nights_max,price_min,price_max,q,featured,sort,page,page_size` |
| `GET /api/cruises/:id` | Detail: itinerary, pricing, deals, ship |
| `GET /api/filters` | Filter metadata for sidebar/search |
| `GET /api/cruise-lines`, `/api/cruise-lines/:slug` | Lines + fleet |
| `GET /api/ships/:slug` | Ship + upcoming sailings |
| `GET /api/destinations`, `/api/destinations/:slug` | Destinations |
| `GET /api/deals` | Active deals |
| `POST /api/bookings` | Create booking |
| `GET /api/bookings/:ref` | Look up booking |

## Pages

`/` home · `/cruises` filtered results · `/cruises/:id` detail ·
`/cruise-lines`, `/destinations`, `/deals` · `/ships/:slug` ·
`/book/:id` 3-step booking · `/booking/:ref` confirmation · `/my-bookings` ·
`/about` `/privacy` `/terms` `/contact` · `/guides` + `/guides/:slug`

## Pre-launch checklist (Google Ads/AdSense approval)

- [ ] Put real business info in `client/src/site.js` (phone, email, address, domain)
- [ ] Replace `www.travelone.example` in `index.html`, `public/robots.txt`, `public/sitemap.xml` with your domain
- [ ] Serve over HTTPS on your domain (Vercel/Netlify for client + host API separately, or one VPS)
- [ ] Keep adding Guides articles — AdSense needs substantial original content
- [ ] Optional: set up a real email inbox for `SITE.email` — contact form submissions also land in Admin → Messages

## Admin panel

`/admin` — sign in with the `ADMIN_KEY` from `server/.env` (default `admin123`).

Full CRUD for: cruises, ships, cruise lines, ports, destinations, deals,
itinerary days, cabin pricing — plus booking management (view, confirm, cancel).

- Child data (itinerary, pricing, deals) is managed per-cruise via the
  "Manage …" links on a cruise's edit page, or globally from the sidebar.
- Admin API: `GET/POST/PUT/DELETE /api/admin/<table>[/:id]` with the
  `x-admin-key` header. Allowed tables/columns are whitelisted in
  `server/src/db/schema.js`.
