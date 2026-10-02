import sql from 'mssql';
import { TABLES } from './schema.js';

let pool;

export async function connect() {
  pool = await sql.connect({
    server: process.env.DB_SERVER || 'localhost',
    port: Number(process.env.DB_PORT || 1433),
    database: process.env.DB_NAME || 'CruiseDB',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_CERT !== 'false',
    },
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  });
  return pool;
}

const SORTS = {
  price_asc: 'p.price ASC',
  price_desc: 'p.price DESC',
  date_asc: 'c.departure_date ASC',
  nights_asc: 'c.nights ASC',
  nights_desc: 'c.nights DESC',
  rating_desc: 's.rating DESC',
};

function buildFilters(q, req) {
  const where = ['c.departure_date >= CAST(GETUTCDATE() AS DATE)'];
  const add = (name, val, type) => req.input(name, type, val);
  const csv = (v) => String(v).split(',').map((s) => s.trim()).filter(Boolean).join(',');

  if (q.destination) {
    add('dest', Number(q.destination), sql.Int);
    where.push('EXISTS (SELECT 1 FROM dbo.cruise_destinations cd WHERE cd.cruise_id = c.id AND cd.destination_id = @dest)');
  }
  if (q.line) {
    add('lines', csv(q.line), sql.NVarChar(400));
    where.push("cl.id IN (SELECT CAST(value AS INT) FROM STRING_SPLIT(@lines, ','))");
  }
  if (q.ship) {
    add('ships', csv(q.ship), sql.NVarChar(400));
    where.push("c.ship_id IN (SELECT CAST(value AS INT) FROM STRING_SPLIT(@ships, ','))");
  }
  if (q.port) {
    add('ports', csv(q.port), sql.NVarChar(400));
    where.push("c.departure_port_id IN (SELECT CAST(value AS INT) FROM STRING_SPLIT(@ports, ','))");
  }
  if (q.month) {
    add('months', csv(q.month), sql.NVarChar(400));
    where.push("FORMAT(c.departure_date, 'yyyy-MM') IN (SELECT value FROM STRING_SPLIT(@months, ','))");
  }
  if (q.nights_min) { add('nmin', Number(q.nights_min), sql.Int); where.push('c.nights >= @nmin'); }
  if (q.nights_max) { add('nmax', Number(q.nights_max), sql.Int); where.push('c.nights <= @nmax'); }
  if (q.price_min) { add('pmin', Number(q.price_min), sql.Decimal(10, 2)); where.push('p.price >= @pmin'); }
  if (q.price_max) { add('pmax', Number(q.price_max), sql.Decimal(10, 2)); where.push('p.price <= @pmax'); }
  if (q.featured === '1' || q.featured === 'true') where.push('c.is_featured = 1');
  if (q.q) {
    add('q', `%${q.q}%`, sql.NVarChar(200));
    where.push('(c.name LIKE @q OR s.name LIKE @q OR cl.name LIKE @q OR dp.name LIKE @q)');
  }
  return where.join(' AND ');
}

const BASE_FROM = `
  FROM dbo.cruises c
  JOIN dbo.ships s ON s.id = c.ship_id
  JOIN dbo.cruise_lines cl ON cl.id = s.cruise_line_id
  JOIN dbo.ports dp ON dp.id = c.departure_port_id
  JOIN dbo.ports rp ON rp.id = c.return_port_id
  OUTER APPLY (
    SELECT TOP 1 price, taxes FROM dbo.cruise_pricing
    WHERE cruise_id = c.id AND cabin_category = 'interior'
  ) p
  OUTER APPLY (
    SELECT TOP 1 badge FROM dbo.deals d WHERE d.cruise_id = c.id
  ) dl`;

export async function listCruises(q) {
  const page = Math.max(1, Number(q.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(q.page_size) || 10));

  const req = pool.request();
  const where = buildFilters(q, req);
  const orderBy = SORTS[q.sort] || SORTS.date_asc;

  const countReq = pool.request();
  const countWhere = buildFilters(q, countReq);
  const total = (await countReq.query(`SELECT COUNT(*) AS total ${BASE_FROM} WHERE ${countWhere}`)).recordset[0].total;

  const result = await req.query(`
    SELECT c.id, c.name, c.slug, c.departure_date, c.return_date, c.nights, c.image_url, c.is_featured,
           s.name AS ship_name, s.slug AS ship_slug, s.rating AS ship_rating, s.image_url AS ship_image,
           cl.name AS line_name, cl.slug AS line_slug, cl.rating AS line_rating,
           dp.name AS departure_port, rp.name AS return_port,
           p.price AS from_price, p.taxes, dl.badge AS deal_badge
    ${BASE_FROM}
    WHERE ${where}
    ORDER BY ${orderBy}
    OFFSET ${(page - 1) * pageSize} ROWS FETCH NEXT ${pageSize} ROWS ONLY`);

  return { data: result.recordset, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getCruise(id) {
  const r = await pool.request().input('id', sql.Int, id).query(`
    SELECT c.*, s.name AS ship_name, s.slug AS ship_slug, s.rating AS ship_rating,
           s.image_url AS ship_image, s.passenger_capacity, s.crew, s.year_built,
           s.year_refurbished, s.tonnage, s.length_m, s.speed_knots, s.description AS ship_description,
           cl.name AS line_name, cl.slug AS line_slug, cl.rating AS line_rating,
           dp.name AS departure_port, rp.name AS return_port
    FROM dbo.cruises c
    JOIN dbo.ships s ON s.id = c.ship_id
    JOIN dbo.cruise_lines cl ON cl.id = s.cruise_line_id
    JOIN dbo.ports dp ON dp.id = c.departure_port_id
    JOIN dbo.ports rp ON rp.id = c.return_port_id
    WHERE c.id = @id`);
  const cruise = r.recordset[0];
  if (!cruise) return null;

  const [itin, pricing, deals, dests] = await Promise.all([
    pool.request().input('id', sql.Int, id).query(`
      SELECT i.day_number, i.arrival_time, i.departure_time, i.description, p.name AS port_name
      FROM dbo.itinerary_days i LEFT JOIN dbo.ports p ON p.id = i.port_id
      WHERE i.cruise_id = @id ORDER BY i.day_number`),
    pool.request().input('id', sql.Int, id).query(
      `SELECT cabin_category, price, original_price, taxes, availability FROM dbo.cruise_pricing WHERE cruise_id = @id`),
    pool.request().input('id', sql.Int, id).query(
      `SELECT title, badge, description, discount_pct, expires_at FROM dbo.deals WHERE cruise_id = @id`),
    pool.request().input('id', sql.Int, id).query(`
      SELECT d.id, d.name, d.slug FROM dbo.cruise_destinations cd
      JOIN dbo.destinations d ON d.id = cd.destination_id WHERE cd.cruise_id = @id`),
  ]);

  return {
    ...cruise,
    itinerary: itin.recordset,
    pricing: pricing.recordset,
    deals: deals.recordset,
    destinations: dests.recordset,
  };
}

export async function getFilterMeta() {
  const [lines, ships, ports, dests, months, range] = await Promise.all([
    pool.request().query(`SELECT id, name, slug FROM dbo.cruise_lines ORDER BY name`),
    pool.request().query(`SELECT id, name, slug, cruise_line_id FROM dbo.ships ORDER BY name`),
    pool.request().query(`SELECT DISTINCT p.id, p.name FROM dbo.ports p
                          JOIN dbo.cruises c ON c.departure_port_id = p.id
                          WHERE c.departure_date >= CAST(GETUTCDATE() AS DATE) ORDER BY p.name`),
    pool.request().query(`SELECT d.id, d.name, d.slug FROM dbo.destinations d
                          WHERE EXISTS (SELECT 1 FROM dbo.cruise_destinations cd
                                        JOIN dbo.cruises c ON c.id = cd.cruise_id
                                        WHERE cd.destination_id = d.id
                                          AND c.departure_date >= CAST(GETUTCDATE() AS DATE))
                          ORDER BY d.name`),
    pool.request().query(`SELECT DISTINCT FORMAT(departure_date, 'yyyy-MM') AS ym
                          FROM dbo.cruises WHERE departure_date >= CAST(GETUTCDATE() AS DATE)
                          ORDER BY ym`),
    pool.request().query(`SELECT MIN(p.price) AS min_price, MAX(p.price) AS max_price,
                                 MIN(c.nights) AS min_nights, MAX(c.nights) AS max_nights
                          FROM dbo.cruises c
                          JOIN dbo.cruise_pricing p ON p.cruise_id = c.id AND p.cabin_category = 'interior'
                          WHERE c.departure_date >= CAST(GETUTCDATE() AS DATE)`),
  ]);
  return {
    lines: lines.recordset,
    ships: ships.recordset,
    ports: ports.recordset,
    destinations: dests.recordset,
    months: months.recordset.map((r) => r.ym),
    ...range.recordset[0],
  };
}

export async function getLines() {
  return (await pool.request().query(
    `SELECT id, name, slug, tagline, description, rating, ship_count FROM dbo.cruise_lines ORDER BY rating DESC`)).recordset;
}

export async function getLine(slug) {
  const line = (await pool.request().input('s', sql.NVarChar(140), slug)
    .query(`SELECT * FROM dbo.cruise_lines WHERE slug = @s`)).recordset[0];
  if (!line) return null;
  const ships = (await pool.request().input('lid', sql.Int, line.id)
    .query(`SELECT * FROM dbo.ships WHERE cruise_line_id = @lid ORDER BY rating DESC`)).recordset;
  return { ...line, ships };
}

export async function getShip(slug) {
  const ship = (await pool.request().input('s', sql.NVarChar(140), slug).query(`
    SELECT s.*, cl.name AS line_name, cl.slug AS line_slug
    FROM dbo.ships s JOIN dbo.cruise_lines cl ON cl.id = s.cruise_line_id
    WHERE s.slug = @s`)).recordset[0];
  if (!ship) return null;
  const cruises = (await pool.request().input('sid', sql.Int, ship.id).query(`
    SELECT c.id, c.name, c.slug, c.departure_date, c.nights, c.image_url,
           dp.name AS departure_port, p.price AS from_price
    FROM dbo.cruises c
    JOIN dbo.ports dp ON dp.id = c.departure_port_id
    OUTER APPLY (SELECT TOP 1 price FROM dbo.cruise_pricing WHERE cruise_id = c.id AND cabin_category='interior') p
    WHERE c.ship_id = @sid AND c.departure_date >= CAST(GETUTCDATE() AS DATE)
    ORDER BY c.departure_date`)).recordset;
  return { ...ship, cruises };
}

export async function getDestinations() {
  return (await pool.request().query(`SELECT * FROM dbo.destinations ORDER BY name`)).recordset;
}

export async function getDestination(slug) {
  return (await pool.request().input('s', sql.NVarChar(140), slug)
    .query(`SELECT * FROM dbo.destinations WHERE slug = @s`)).recordset[0];
}

export async function getDeals() {
  return (await pool.request().query(`
    SELECT d.*, c.name AS cruise_name, c.slug AS cruise_slug, c.departure_date, c.nights,
           c.image_url, s.name AS ship_name, cl.name AS line_name,
           p.price AS from_price
    FROM dbo.deals d
    LEFT JOIN dbo.cruises c ON c.id = d.cruise_id
    LEFT JOIN dbo.ships s ON s.id = c.ship_id
    LEFT JOIN dbo.cruise_lines cl ON cl.id = s.cruise_line_id
    OUTER APPLY (SELECT TOP 1 price FROM dbo.cruise_pricing WHERE cruise_id = c.id AND cabin_category='interior') p
    WHERE d.expires_at IS NULL OR d.expires_at >= CAST(GETUTCDATE() AS DATE)
    ORDER BY d.expires_at`)).recordset;
}

export async function createBooking(b) {
  const ref = 'CD' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const result = await pool.request()
    .input('ref', sql.NVarChar(20), ref)
    .input('cid', sql.Int, b.cruise_id)
    .input('cabin', sql.NVarChar(20), b.cabin_category)
    .input('guests', sql.Int, b.num_guests)
    .input('fn', sql.NVarChar(80), b.first_name)
    .input('ln', sql.NVarChar(80), b.last_name)
    .input('em', sql.NVarChar(160), b.email)
    .input('ph', sql.NVarChar(40), b.phone || null)
    .input('sr', sql.NVarChar(1000), b.special_requests || null)
    .input('total', sql.Decimal(12, 2), b.total_price)
    .query(`INSERT INTO dbo.bookings
      (booking_ref, cruise_id, cabin_category, num_guests, first_name, last_name, email, phone, special_requests, total_price)
      OUTPUT INSERTED.* VALUES (@ref, @cid, @cabin, @guests, @fn, @ln, @em, @ph, @sr, @total)`);
  return result.recordset[0];
}

export async function getBooking(ref) {
  return (await pool.request().input('r', sql.NVarChar(20), ref).query(`
    SELECT b.*, c.name AS cruise_name, c.departure_date, c.nights, c.image_url,
           s.name AS ship_name, cl.name AS line_name, dp.name AS departure_port
    FROM dbo.bookings b
    JOIN dbo.cruises c ON c.id = b.cruise_id
    JOIN dbo.ships s ON s.id = c.ship_id
    JOIN dbo.cruise_lines cl ON cl.id = s.cruise_line_id
    JOIN dbo.ports dp ON dp.id = c.departure_port_id
    WHERE b.booking_ref = @r`)).recordset[0];
}

export async function createContact(m) {
  return (await pool.request()
    .input('n', sql.NVarChar(120), m.name)
    .input('e', sql.NVarChar(160), m.email)
    .input('s', sql.NVarChar(200), m.subject || null)
    .input('m', sql.NVarChar(2000), m.message)
    .query(`INSERT INTO dbo.contact_messages (name, email, subject, message)
            OUTPUT INSERTED.* VALUES (@n, @e, @s, @m)`)).recordset[0];
}

// ------------------------- generic admin CRUD -------------------------

const slugify = (s) =>
  String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const numCols = new Set(['cruise_line_id', 'destination_id', 'ship_id', 'departure_port_id',
  'return_port_id', 'nights', 'cruise_id', 'day_number', 'port_id', 'availability',
  'discount_pct', 'ship_count', 'passenger_capacity', 'crew', 'year_built', 'year_refurbished',
  'tonnage', 'num_guests']);
const decCols = new Set(['rating', 'length_m', 'speed_knots', 'price', 'original_price', 'taxes']);
const bitCols = new Set(['is_featured']);

function bindValue(req, name, col, val) {
  if (val === '' || val === undefined) val = null;
  if (val === null) return req.input(name, sql.NVarChar(sql.MAX), null);
  if (numCols.has(col)) return req.input(name, sql.Int, Number(val));
  if (decCols.has(col)) return req.input(name, sql.Decimal(12, 2), Number(val));
  if (bitCols.has(col)) return req.input(name, sql.Bit, val === true || val === 'true' || val === 1 || val === '1');
  if (/(^|_)(date|expires_at)$/.test(col)) return req.input(name, sql.Date, String(val).slice(0, 10));
  return req.input(name, sql.NVarChar(sql.MAX), String(val));
}

export async function adminList(table, filters = {}) {
  const t = TABLES[table];
  const req = pool.request();
  let text = `SELECT t.*${t.extraSelect ? ', dx.destination_ids' : ''} FROM dbo.${table} t ${t.extraSelect || ''}`;
  const conds = [];
  if (filters.cruise_id && t.cols.includes('cruise_id')) {
    req.input('cf', sql.Int, Number(filters.cruise_id));
    conds.push('t.cruise_id = @cf');
  }
  if (conds.length) text += ` WHERE ${conds.join(' AND ')}`;
  text += ' ORDER BY t.id DESC';
  const rows = (await req.query(text)).recordset;
  rows.forEach((r) => {
    if (typeof r.destination_ids === 'string') r.destination_ids = r.destination_ids.split(',').map(Number);
  });
  return rows;
}

export async function adminCreate(table, body) {
  const t = TABLES[table];
  const data = { ...body };
  if (!data.slug && data.name) data.slug = slugify(data.name);
  if (table === 'cruises') {
    if (!data.return_port_id && data.departure_port_id) data.return_port_id = data.departure_port_id;
    if (!data.nights && data.departure_date && data.return_date) {
      data.nights = Math.round((new Date(data.return_date) - new Date(data.departure_date)) / 86400000);
    }
  }
  const cols = t.cols.filter((c) => data[c] !== undefined);
  if (!cols.length) throw new Error('No valid fields');
  const req = pool.request();
  cols.forEach((c) => bindValue(req, `c_${c}`, c, data[c]));
  const text = `INSERT INTO dbo.${table} (${cols.join(', ')}) OUTPUT INSERTED.* VALUES (${cols.map((c) => `@c_${c}`).join(', ')})`;
  const row = (await req.query(text)).recordset[0];
  if (table === 'cruises' && Array.isArray(body.destination_ids)) await syncCruiseDestinations(row.id, body.destination_ids);
  return row;
}

export async function adminUpdate(table, id, body) {
  const t = TABLES[table];
  const data = { ...body };
  if (!data.slug && data.name) data.slug = slugify(data.name);
  const cols = t.cols.filter((c) => data[c] !== undefined);
  if (cols.length) {
    const req = pool.request();
    req.input('id', sql.Int, Number(id));
    cols.forEach((c) => bindValue(req, `c_${c}`, c, data[c]));
    await req.query(`UPDATE dbo.${table} SET ${cols.map((c) => `${c} = @c_${c}`).join(', ')} WHERE id = @id`);
  }
  if (table === 'cruises' && Array.isArray(body.destination_ids)) await syncCruiseDestinations(id, body.destination_ids);
  return (await pool.request().input('id', sql.Int, Number(id)).query(`SELECT * FROM dbo.${table} WHERE id = @id`)).recordset[0];
}

export async function adminDelete(table, id) {
  await pool.request().input('id', sql.Int, Number(id)).query(`DELETE FROM dbo.${table} WHERE id = @id`);
}

async function syncCruiseDestinations(cruiseId, ids) {
  await pool.request().input('cid', sql.Int, Number(cruiseId))
    .query('DELETE FROM dbo.cruise_destinations WHERE cruise_id = @cid');
  for (const did of ids.map(Number).filter(Boolean)) {
    await pool.request().input('cid', sql.Int, Number(cruiseId)).input('did', sql.Int, did)
      .query('INSERT INTO dbo.cruise_destinations (cruise_id, destination_id) VALUES (@cid, @did)');
  }
}
