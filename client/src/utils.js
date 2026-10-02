// Handles both 'YYYY-MM-DD' (memory driver) and full ISO datetimes (SQL Server).
export const toDate = (v) => new Date(String(v).slice(0, 10) + 'T12:00:00');
