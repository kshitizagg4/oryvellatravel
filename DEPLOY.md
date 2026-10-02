# Deploying TravelOne Cruises

Current state:
- **Frontend** — ✅ live at https://oryvellatravel.com (static build in `client/dist`, uploaded via SFTP)
- **API** — needs a Node-capable host (your hosting is SFTP-only). Recommended: **Render** free tier
- **Database** — **Azure SQL** free tier

> ⚠️ You pasted server credentials in chat — rotate `Work@1234` on the hosting panel after deployment.

## Step 1 — Azure SQL (database)

1. portal.azure.com → Create a resource → **Azure SQL Database**
2. Create new server (`yourname-sqlsrv.database.windows.net`), auth: SQL authentication, set admin user/password
3. For compute: choose the **Free offer** (or Basic ~$5/mo) → database name `CruiseDB`
4. Networking: ✅ "Allow Azure services" ✅ add your client IP
5. Once created → Query editor (or sqlcmd from your Mac) and run, connected to `CruiseDB`:
   - `database/azure/schema.sql`
   - `database/azure/seed.sql`
   (These Azure variants skip `CREATE DATABASE`/`USE`, which Azure doesn't support.)

## Step 2 — Push code to GitHub (Render needs a git repo)

```bash
cd ~/Desktop/Travel1
echo "node_modules/\n.env\ndist/" > .gitignore
git init && git add -A && git commit -m "TravelOne Cruises"
# create a repo at github.com/new → then:
git remote add origin https://github.com/YOU/travelone.git
git push -u origin main
```

## Step 3 — Render (API)

1. render.com → New → **Blueprint** → connect the GitHub repo (it reads `render.yaml`)
2. Set secret env vars in the dashboard: `DB_PASSWORD`, `ADMIN_KEY` (use a strong key, not `admin123` — it's public-facing now)
3. Deploy → you get `https://travelone-api.onrender.com` → test `…/api/health` → should say `"driver":"mssql"`

## Step 4 — Point the frontend at the API & redeploy

```bash
cd ~/Desktop/Travel1/client
echo "VITE_API_URL=https://travelone-api.onrender.com" > .env.production
npm run build
# upload dist/* to web/oryvellatravel.com/public_html via SFTP (same as before)
```

Free Render sleeps after inactivity (~50s cold start on first request — fine for a demo; paid $7/mo is instant).

## Alternative — everything on your VPS

If your hosting provider gives you **root** access (or the Hestia `admin` login), we can instead:
enable shell → install Node + PM2 → proxy `/api` → the app in nginx → install SQL Server via Docker (needs ~2GB RAM).
That's cleaner long-term, but needs those credentials — the `hosting` account is SFTP-only.
