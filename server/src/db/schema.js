// Whitelist of tables/columns writable via the admin API.
// Anything not listed here cannot be touched through generic CRUD.
export const TABLES = {
  cruise_lines: {
    cols: ['name', 'slug', 'logo_url', 'tagline', 'description', 'rating', 'ship_count'],
  },
  ships: {
    cols: ['cruise_line_id', 'name', 'slug', 'image_url', 'passenger_capacity', 'crew',
      'year_built', 'year_refurbished', 'tonnage', 'length_m', 'speed_knots', 'description', 'rating'],
  },
  destinations: {
    cols: ['name', 'slug', 'region', 'image_url', 'description'],
  },
  ports: {
    cols: ['name', 'city', 'country', 'destination_id'],
  },
  cruises: {
    cols: ['ship_id', 'name', 'slug', 'departure_port_id', 'return_port_id',
      'departure_date', 'return_date', 'nights', 'image_url', 'description', 'is_featured'],
    // comma-separated destination ids returned in list/detail for form prefill
    extraSelect: `OUTER APPLY (
      SELECT STRING_AGG(CAST(cd.destination_id AS NVARCHAR(10)), ',') AS destination_ids
      FROM dbo.cruise_destinations cd WHERE cd.cruise_id = t.id) dx`,
  },
  itinerary_days: {
    cols: ['cruise_id', 'day_number', 'port_id', 'arrival_time', 'departure_time', 'description'],
    childOf: 'cruises',
  },
  cruise_pricing: {
    cols: ['cruise_id', 'cabin_category', 'price', 'original_price', 'taxes', 'availability'],
    childOf: 'cruises',
  },
  deals: {
    cols: ['cruise_id', 'title', 'badge', 'description', 'discount_pct', 'expires_at'],
  },
  bookings: {
    cols: ['status'],   // only status is editable
    readonly: false,
  },
  contact_messages: {
    cols: ['status'],   // mark NEW/READ; created via POST /api/contact
    readonly: false,
  },
};

export const ok = (table) => Object.prototype.hasOwnProperty.call(TABLES, table);
