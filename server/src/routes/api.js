import { Router } from 'express';
import { db, getDriver } from '../db/index.js';

const router = Router();
const wrap = (fn) => async (req, res, next) => { try { await fn(req, res, next); } catch (e) { next(e); } };

router.get('/health', (req, res) => res.json({ ok: true, driver: getDriver() }));

router.get('/cruises', wrap(async (req, res) => {
  res.json(await db.listCruises(req.query));
}));

router.get('/cruises/:id', wrap(async (req, res) => {
  const cruise = await db.getCruise(req.params.id);
  if (!cruise) return res.status(404).json({ error: 'Cruise not found' });
  res.json(cruise);
}));

router.get('/filters', wrap(async (req, res) => {
  res.json(await db.getFilterMeta());
}));

router.get('/cruise-lines', wrap(async (req, res) => res.json(await db.getLines())));

router.get('/cruise-lines/:slug', wrap(async (req, res) => {
  const line = await db.getLine(req.params.slug);
  if (!line) return res.status(404).json({ error: 'Cruise line not found' });
  res.json(line);
}));

router.get('/ships/:slug', wrap(async (req, res) => {
  const ship = await db.getShip(req.params.slug);
  if (!ship) return res.status(404).json({ error: 'Ship not found' });
  res.json(ship);
}));

router.get('/destinations', wrap(async (req, res) => res.json(await db.getDestinations())));

router.get('/destinations/:slug', wrap(async (req, res) => {
  const dest = await db.getDestination(req.params.slug);
  if (!dest) return res.status(404).json({ error: 'Destination not found' });
  res.json(dest);
}));

router.get('/deals', wrap(async (req, res) => res.json(await db.getDeals())));

router.post('/bookings', wrap(async (req, res) => {
  const { cruise_id, cabin_category, num_guests, first_name, last_name, email, phone, special_requests } = req.body || {};
  if (!cruise_id || !cabin_category || !num_guests || !first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const cruise = await db.getCruise(cruise_id);
  if (!cruise) return res.status(404).json({ error: 'Cruise not found' });
  const pricing = cruise.pricing.find((p) => p.cabin_category === cabin_category);
  if (!pricing) return res.status(400).json({ error: 'Invalid cabin category' });
  const total = +(Number(pricing.price + pricing.taxes) * num_guests).toFixed(2);

  const booking = await db.createBooking({
    cruise_id: Number(cruise_id), cabin_category, num_guests: Number(num_guests),
    first_name, last_name, email, phone, special_requests, total_price: total,
  });
  res.status(201).json(booking);
}));

router.post('/contact', wrap(async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' });
  res.status(201).json(await db.createContact({ name, email, subject, message }));
}));

router.get('/bookings/:ref', wrap(async (req, res) => {
  const booking = await db.getBooking(req.params.ref);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
}));

export default router;
