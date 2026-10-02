import { useEffect, useState } from 'react';
import { adminList } from './api.js';

const REF_TABLES = ['cruises', 'ships', 'ports', 'destinations', 'cruise_lines'];

// Returns { table: { id: displayName } } for resolving ref fields.
export function useLookups() {
  const [map, setMap] = useState({});
  useEffect(() => {
    Promise.all(
      REF_TABLES.map((t) =>
        adminList(t).then((rows) => [
          t,
          Object.fromEntries(rows.map((r) => [r.id, r.name || r.title || r.booking_ref || `#${r.id}`])),
        ]),
      ),
    )
      .then((entries) => setMap(Object.fromEntries(entries)))
      .catch(() => {});
  }, []);
  return map;
}
