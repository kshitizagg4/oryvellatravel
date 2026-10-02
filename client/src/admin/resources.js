// Config-driven admin resources.
// type: text | textarea | number | date | checkbox | ref (select) | multiref
// ref: pulls options from that resource's table via /api/admin/<resource>

export const RESOURCES = {
  cruises: {
    label: 'Cruises', singular: 'cruise',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'ship_id', label: 'Ship', ref: 'ships' },
      { key: 'departure_date', label: 'Departs', type: 'date' },
      { key: 'nights', label: 'Nights' },
      { key: 'is_featured', label: 'Featured', type: 'bool' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', hint: 'Leave blank to auto-generate' },
      { key: 'ship_id', label: 'Ship', type: 'ref', ref: 'ships', required: true },
      { key: 'departure_port_id', label: 'Departure port', type: 'ref', ref: 'ports', required: true },
      { key: 'return_port_id', label: 'Return port', type: 'ref', ref: 'ports' },
      { key: 'departure_date', label: 'Departure date', type: 'date', required: true },
      { key: 'return_date', label: 'Return date', type: 'date', hint: 'Or set nights only' },
      { key: 'nights', label: 'Nights', type: 'number', required: true },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'is_featured', label: 'Featured on homepage', type: 'checkbox' },
      { key: 'destination_ids', label: 'Destinations', type: 'multiref', ref: 'destinations' },
    ],
    children: [
      { resource: 'itinerary_days', label: 'Itinerary days' },
      { resource: 'cruise_pricing', label: 'Cabin pricing' },
      { resource: 'deals', label: 'Deals' },
    ],
  },
  ships: {
    label: 'Ships', singular: 'ship',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'cruise_line_id', label: 'Line', ref: 'cruise_lines' },
      { key: 'passenger_capacity', label: 'Guests' },
      { key: 'year_built', label: 'Built' },
      { key: 'rating', label: 'Rating' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', hint: 'Leave blank to auto-generate' },
      { key: 'cruise_line_id', label: 'Cruise line', type: 'ref', ref: 'cruise_lines', required: true },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'passenger_capacity', label: 'Passenger capacity', type: 'number' },
      { key: 'crew', label: 'Crew', type: 'number' },
      { key: 'year_built', label: 'Year built', type: 'number' },
      { key: 'year_refurbished', label: 'Year refurbished', type: 'number' },
      { key: 'tonnage', label: 'Tonnage (GT)', type: 'number' },
      { key: 'length_m', label: 'Length (m)', type: 'number' },
      { key: 'speed_knots', label: 'Speed (knots)', type: 'number' },
      { key: 'rating', label: 'Rating (0–5)', type: 'number', step: '0.1' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  cruise_lines: {
    label: 'Cruise Lines', singular: 'cruise line',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'tagline', label: 'Tagline' },
      { key: 'rating', label: 'Rating' },
      { key: 'ship_count', label: 'Ships' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', hint: 'Leave blank to auto-generate' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'logo_url', label: 'Logo URL', type: 'text' },
      { key: 'rating', label: 'Rating (0–5)', type: 'number', step: '0.1' },
      { key: 'ship_count', label: 'Ship count', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  destinations: {
    label: 'Destinations', singular: 'destination',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'region', label: 'Region' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', hint: 'Leave blank to auto-generate' },
      { key: 'region', label: 'Region', type: 'text' },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  ports: {
    label: 'Ports', singular: 'port',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'city', label: 'City' },
      { key: 'country', label: 'Country' },
      { key: 'destination_id', label: 'Destination', ref: 'destinations' },
    ],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'destination_id', label: 'Destination', type: 'ref', ref: 'destinations' },
    ],
  },
  deals: {
    label: 'Deals', singular: 'deal',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'Title' },
      { key: 'badge', label: 'Badge' },
      { key: 'cruise_id', label: 'Cruise', ref: 'cruises' },
      { key: 'expires_at', label: 'Expires', type: 'date' },
    ],
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'badge', label: 'Badge text', type: 'text', placeholder: 'e.g. 2 FOR 1, LAST MINUTE' },
      { key: 'cruise_id', label: 'Linked cruise', type: 'ref', ref: 'cruises' },
      { key: 'discount_pct', label: 'Discount %', type: 'number' },
      { key: 'expires_at', label: 'Expires', type: 'date' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  itinerary_days: {
    label: 'Itinerary Days', singular: 'itinerary day', child: 'cruise_id',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'cruise_id', label: 'Cruise', ref: 'cruises' },
      { key: 'day_number', label: 'Day' },
      { key: 'port_id', label: 'Port', ref: 'ports' },
      { key: 'arrival_time', label: 'Arrives' },
      { key: 'departure_time', label: 'Departs' },
    ],
    fields: [
      { key: 'cruise_id', label: 'Cruise', type: 'ref', ref: 'cruises', required: true },
      { key: 'day_number', label: 'Day number', type: 'number', required: true },
      { key: 'port_id', label: 'Port (blank = day at sea)', type: 'ref', ref: 'ports' },
      { key: 'arrival_time', label: 'Arrival time', type: 'text', placeholder: 'e.g. 8:00 AM' },
      { key: 'departure_time', label: 'Departure time', type: 'text', placeholder: 'e.g. 6:00 PM' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  cruise_pricing: {
    label: 'Cabin Pricing', singular: 'pricing row', child: 'cruise_id',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'cruise_id', label: 'Cruise', ref: 'cruises' },
      { key: 'cabin_category', label: 'Cabin' },
      { key: 'price', label: 'Price' },
      { key: 'taxes', label: 'Taxes' },
      { key: 'availability', label: 'Avail.' },
    ],
    fields: [
      { key: 'cruise_id', label: 'Cruise', type: 'ref', ref: 'cruises', required: true },
      {
        key: 'cabin_category', label: 'Cabin category', type: 'select', required: true,
        options: [
          { value: 'interior', label: 'Interior' },
          { value: 'oceanview', label: 'Oceanview' },
          { value: 'balcony', label: 'Balcony' },
          { value: 'suite', label: 'Suite' },
        ],
      },
      { key: 'price', label: 'Price per person', type: 'number', required: true },
      { key: 'original_price', label: 'Original price (was)', type: 'number' },
      { key: 'taxes', label: 'Taxes & fees pp', type: 'number' },
      { key: 'availability', label: 'Availability', type: 'number' },
    ],
  },
  bookings: {
    label: 'Bookings', singular: 'booking', noCreate: true,
    columns: [
      { key: 'booking_ref', label: 'Ref' },
      { key: 'first_name', label: 'Guest', render: (r) => `${r.first_name} ${r.last_name}` },
      { key: 'email', label: 'Email' },
      { key: 'cruise_id', label: 'Cruise', ref: 'cruises' },
      { key: 'num_guests', label: 'Guests' },
      { key: 'total_price', label: 'Total' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      {
        key: 'status', label: 'Status', type: 'select', required: true,
        options: [
          { value: 'CONFIRMED', label: 'Confirmed' },
          { value: 'PENDING', label: 'Pending' },
          { value: 'CANCELLED', label: 'Cancelled' },
        ],
      },
    ],
  },
  contact_messages: {
    label: 'Messages', singular: 'message', noCreate: true,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Subject' },
      { key: 'message', label: 'Message' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Received', type: 'date' },
    ],
    fields: [
      {
        key: 'status', label: 'Status', type: 'select', required: true,
        options: [
          { value: 'NEW', label: 'New' },
          { value: 'READ', label: 'Read' },
        ],
      },
    ],
  },
};

export const NAV_GROUPS = [
  { title: 'Catalog', keys: ['cruises', 'itinerary_days', 'cruise_pricing', 'deals'] },
  { title: 'Reference', keys: ['cruise_lines', 'ships', 'ports', 'destinations'] },
  { title: 'Sales', keys: ['bookings', 'contact_messages'] },
];

