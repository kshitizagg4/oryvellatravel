import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { init } from './db/index.js';
import api from './routes/api.js';
import admin from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || true }));
app.use(express.json());
app.use('/api/admin', admin);
app.use('/api', api);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

init().then(() => {
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
});
