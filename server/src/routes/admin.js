import { Router } from 'express';
import { db } from '../db/index.js';
import { TABLES } from '../db/schema.js';

const router = Router();
const wrap = (fn) => async (req, res, next) => { try { await fn(req, res, next); } catch (e) { next(e); } };

// Simple shared-key protection. If ADMIN_KEY is unset the API is open (dev mode).
router.use((req, res, next) => {
  const key = process.env.ADMIN_KEY;
  if (!key) return next();
  if (req.headers['x-admin-key'] === key) return next();
  res.status(401).json({ error: 'Invalid admin key' });
});

router.get('/', (req, res) => res.json({ ok: true }));

router.get('/:table', wrap(async (req, res) => {
  if (!TABLES[req.params.table]) return res.status(404).json({ error: 'Unknown resource' });
  res.json(await db.adminList(req.params.table, req.query));
}));

router.get('/:table/:id', wrap(async (req, res) => {
  if (!TABLES[req.params.table]) return res.status(404).json({ error: 'Unknown resource' });
  const rows = await db.adminList(req.params.table, {});
  const row = rows.find((r) => r.id === Number(req.params.id));
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
}));

router.post('/:table', wrap(async (req, res) => {
  const t = TABLES[req.params.table];
  if (!t) return res.status(404).json({ error: 'Unknown resource' });
  if (t.readonly) return res.status(405).json({ error: 'Resource is read-only' });
  try {
    res.status(201).json(await db.adminCreate(req.params.table, req.body || {}));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}));

router.put('/:table/:id', wrap(async (req, res) => {
  const t = TABLES[req.params.table];
  if (!t) return res.status(404).json({ error: 'Unknown resource' });
  if (t.readonly) return res.status(405).json({ error: 'Resource is read-only' });
  const row = await db.adminUpdate(req.params.table, req.params.id, req.body || {});
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
}));

router.delete('/:table/:id', wrap(async (req, res) => {
  const t = TABLES[req.params.table];
  if (!t) return res.status(404).json({ error: 'Unknown resource' });
  await db.adminDelete(req.params.table, req.params.id);
  res.status(204).end();
}));

export default router;
