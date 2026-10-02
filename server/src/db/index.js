let repo;
let driver = process.env.DB_DRIVER || 'mssql';

export async function init() {
  if (driver === 'memory') {
    repo = await import('./memory.js');
    console.log('[db] using in-memory demo data');
    return;
  }
  try {
    repo = await import('./mssql.js');
    await repo.connect();
    console.log('[db] connected to SQL Server');
  } catch (err) {
    console.warn(`[db] SQL Server unavailable (${err.message}) — falling back to in-memory demo data`);
    repo = await import('./memory.js');
    driver = 'memory';
  }
}

export const db = new Proxy({}, {
  get(_, prop) {
    if (!repo) throw new Error('db not initialized — call init() first');
    return repo[prop];
  },
});

export const getDriver = () => driver;
