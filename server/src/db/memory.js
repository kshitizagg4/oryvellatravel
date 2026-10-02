// In-memory data driver — mirrors the MSSQL repository interface.
// Used when DB_DRIVER=memory, or as a fallback when SQL Server is unreachable.

const img = (seed) => `https://picsum.photos/seed/${seed}/900/520`;

const lines = [
  { id: 1, name: 'Royal Caribbean', slug: 'royal-caribbean', tagline: 'Come Seek', description: 'Innovative mega-ships packed with thrills — surf simulators, skydiving, Broadway shows.', rating: 4.5, ship_count: 5 },
  { id: 2, name: 'Carnival Cruise Line', slug: 'carnival', tagline: 'Choose Fun', description: 'The Fun Ships — casual, high-energy cruising at great value.', rating: 4.2, ship_count: 4 },
  { id: 3, name: 'Norwegian Cruise Line', slug: 'norwegian', tagline: 'Feel Free', description: 'Freestyle cruising with no fixed dining times and award-winning entertainment.', rating: 4.4, ship_count: 4 },
  { id: 4, name: 'MSC Cruises', slug: 'msc-cruises', tagline: 'Discover the future of cruising', description: 'European style, Mediterranean flair, and some of the newest ships at sea.', rating: 4.3, ship_count: 4 },
  { id: 5, name: 'Princess Cruises', slug: 'princess', tagline: 'Come back new', description: 'Premium cruising with MedallionClass service and refined dining.', rating: 4.5, ship_count: 3 },
  { id: 6, name: 'Celebrity Cruises', slug: 'celebrity', tagline: 'Nothing comes close', description: 'Modern luxury — edgy design, fine dining, and immersive itineraries.', rating: 4.6, ship_count: 3 },
  { id: 7, name: 'Costa Cruises', slug: 'costa', tagline: 'Live your wonder', description: "Italy's finest — vibrant, family-friendly cruising with Mediterranean soul.", rating: 4.1, ship_count: 3 },
  { id: 8, name: 'Disney Cruise Line', slug: 'disney', tagline: 'Where magic meets the sea', description: 'Storytelling, character experiences and family fun, Disney style.', rating: 4.7, ship_count: 2 },
  { id: 9, name: 'Holland America Line', slug: 'holland-america', tagline: 'Savor the journey', description: 'Classic premium cruising with culinary excellence and live music.', rating: 4.4, ship_count: 2 },
  { id: 10, name: 'Virgin Voyages', slug: 'virgin-voyages', tagline: 'Set sail the Virgin way', description: 'Adults-only, design-led ships with no buffets and no kids.', rating: 4.5, ship_count: 2 },
];

const shipRows = [
  [1, 'Wonder of the Seas', 6988, 2022, 236857, 4.7],
  [1, 'Icon of the Seas', 7600, 2024, 248663, 4.8],
  [1, 'Symphony of the Seas', 6680, 2018, 228081, 4.6],
  [1, 'Freedom of the Seas', 4515, 2006, 154407, 4.3],
  [1, 'Odyssey of the Seas', 5498, 2021, 169379, 4.5],
  [2, 'Carnival Jubilee', 6631, 2023, 183521, 4.5],
  [2, 'Carnival Horizon', 4960, 2018, 133500, 4.3],
  [2, 'Carnival Breeze', 3690, 2012, 130000, 4.2],
  [2, 'Carnival Venezia', 5076, 2019, 135500, 4.4],
  [3, 'Norwegian Prima', 3215, 2022, 143535, 4.6],
  [3, 'Norwegian Encore', 3998, 2019, 169116, 4.5],
  [3, 'Norwegian Escape', 4218, 2015, 164998, 4.4],
  [3, 'Norwegian Pearl', 2394, 2006, 93530, 4.2],
  [4, 'MSC World Europa', 6774, 2022, 205700, 4.6],
  [4, 'MSC Seascape', 5877, 2022, 169400, 4.5],
  [4, 'MSC Meraviglia', 5642, 2017, 171598, 4.4],
  [4, 'MSC Divina', 4351, 2012, 139072, 4.3],
  [5, 'Sun Princess', 4300, 2024, 175500, 4.7],
  [5, 'Regal Princess', 3560, 2014, 142714, 4.5],
  [5, 'Caribbean Princess', 3140, 2004, 112894, 4.3],
  [6, 'Celebrity Beyond', 3952, 2022, 140600, 4.8],
  [6, 'Celebrity Reflection', 3046, 2012, 125366, 4.6],
  [6, 'Celebrity Apex', 3405, 2021, 129500, 4.7],
  [7, 'Costa Diadema', 4947, 2014, 133000, 4.3],
  [7, 'Costa Smeralda', 6554, 2019, 185010, 4.4],
  [7, 'Costa Fascinosa', 3800, 2012, 114500, 4.1],
  [8, 'Disney Wish', 4000, 2022, 144000, 4.8],
  [8, 'Disney Fantasy', 4000, 2012, 130000, 4.7],
  [9, 'Nieuw Statendam', 2666, 2018, 99500, 4.5],
  [9, 'Koningsdam', 2650, 2016, 99863, 4.4],
  [10, 'Scarlet Lady', 2770, 2021, 110000, 4.6],
  [10, 'Valiant Lady', 2770, 2022, 110000, 4.6],
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ships = shipRows.map(([lid, name, cap, yr, ton, rating], i) => ({
  id: i + 1, cruise_line_id: lid, name, slug: slugify(name), image_url: img(slugify(name)),
  passenger_capacity: cap, crew: Math.round(cap * 0.38), year_built: yr,
  year_refurbished: yr < 2020 ? yr + 9 : null, tonnage: ton,
  length_m: Math.round(ton / 620), speed_knots: 22, rating,
  description: `${name} — ${lines.find((l) => l.id === lid).name}.`,
}));

const destinations = [
  { id: 1, name: 'Caribbean', slug: 'caribbean', region: 'Americas', image_url: img('caribbean'), description: 'Turquoise waters, white sand beaches and island hopping across the West Indies.' },
  { id: 2, name: 'Bahamas', slug: 'bahamas', region: 'Americas', image_url: img('bahamas'), description: 'Quick getaways to Nassau, private islands and crystal-clear lagoons.' },
  { id: 3, name: 'Western Mediterranean', slug: 'western-mediterranean', region: 'Europe', image_url: img('western-med'), description: 'Barcelona, Rome, the French Riviera and the islands of Italy and Spain.' },
  { id: 4, name: 'Eastern Mediterranean', slug: 'eastern-mediterranean', region: 'Europe', image_url: img('eastern-med'), description: 'Greek Isles, Adriatic gems and the wonders of the ancient world.' },
  { id: 5, name: 'Alaska', slug: 'alaska', region: 'Americas', image_url: img('alaska'), description: 'Glaciers, fjords and frontier towns — nature at its most majestic.' },
  { id: 6, name: 'Mexican Riviera', slug: 'mexican-riviera', region: 'Americas', image_url: img('mexican-riviera'), description: 'Sun-soaked Pacific ports from Cabo to Puerto Vallarta.' },
  { id: 7, name: 'Northern Europe', slug: 'northern-europe', region: 'Europe', image_url: img('northern-europe'), description: 'Norwegian fjords, Baltic capitals and Scandinavian charm.' },
  { id: 8, name: 'Middle East', slug: 'middle-east', region: 'Asia', image_url: img('middle-east'), description: "Dubai, Abu Dhabi and the Arabian Gulf's modern marvels." },
  { id: 9, name: 'Transatlantic', slug: 'transatlantic', region: 'Multi-region', image_url: img('transatlantic'), description: 'Classic ocean crossings between Europe and the Americas.' },
  { id: 10, name: 'South Pacific & Hawaii', slug: 'south-pacific-hawaii', region: 'Oceania', image_url: img('south-pacific'), description: 'Volcanic islands, Polynesian culture and endless Pacific horizons.' },
];

const portRows = [
  ['Miami, Florida', 'Miami', 'United States', 1],
  ['Port Canaveral, Florida', 'Orlando', 'United States', 2],
  ['Fort Lauderdale, Florida', 'Fort Lauderdale', 'United States', 1],
  ['Galveston, Texas', 'Galveston', 'United States', 6],
  ['Barcelona, Spain', 'Barcelona', 'Spain', 3],
  ['Rome (Civitavecchia), Italy', 'Civitavecchia', 'Italy', 3],
  ['Venice (Trieste), Italy', 'Trieste', 'Italy', 4],
  ['Athens (Piraeus), Greece', 'Piraeus', 'Greece', 4],
  ['Istanbul, Turkey', 'Istanbul', 'Turkey', 4],
  ['Seattle, Washington', 'Seattle', 'United States', 5],
  ['Los Angeles, California', 'Los Angeles', 'United States', 6],
  ['San Juan, Puerto Rico', 'San Juan', 'Puerto Rico', 1],
  ['Dubai, UAE', 'Dubai', 'United Arab Emirates', 8],
  ['Southampton, England', 'Southampton', 'United Kingdom', 7],
  ['Genoa, Italy', 'Genoa', 'Italy', 3],
  ['Nassau, Bahamas', 'Nassau', 'Bahamas', 2],
  ['Cozumel, Mexico', 'Cozumel', 'Mexico', 1],
  ['Costa Maya, Mexico', 'Costa Maya', 'Mexico', 1],
  ['Roatan, Honduras', 'Roatan', 'Honduras', 1],
  ['St. Maarten', 'Philipsburg', 'St. Maarten', 1],
  ['St. Thomas, USVI', 'Charlotte Amalie', 'US Virgin Islands', 1],
  ['Aruba', 'Oranjestad', 'Aruba', 1],
  ['Curacao', 'Willemstad', 'Curacao', 1],
  ['Grand Cayman', 'George Town', 'Cayman Islands', 1],
  ['Santorini, Greece', 'Thira', 'Greece', 4],
  ['Mykonos, Greece', 'Mykonos', 'Greece', 4],
  ['Kotor, Montenegro', 'Kotor', 'Montenegro', 4],
  ['Dubrovnik, Croatia', 'Dubrovnik', 'Croatia', 4],
  ['Naples, Italy', 'Naples', 'Italy', 3],
  ['Marseille (Provence), France', 'Marseille', 'France', 3],
  ['Palma de Mallorca, Spain', 'Palma', 'Spain', 3],
  ['Valletta, Malta', 'Valletta', 'Malta', 3],
  ['Juneau, Alaska', 'Juneau', 'United States', 5],
  ['Ketchikan, Alaska', 'Ketchikan', 'United States', 5],
  ['Skagway, Alaska', 'Skagway', 'United States', 5],
  ['Victoria, BC', 'Victoria', 'Canada', 5],
  ['Cabo San Lucas, Mexico', 'Cabo San Lucas', 'Mexico', 6],
  ['Puerto Vallarta, Mexico', 'Puerto Vallarta', 'Mexico', 6],
  ['Mazatlan, Mexico', 'Mazatlan', 'Mexico', 6],
  ['Bergen, Norway', 'Bergen', 'Norway', 7],
  ['Geiranger, Norway', 'Geiranger', 'Norway', 7],
  ['Copenhagen, Denmark', 'Copenhagen', 'Denmark', 7],
  ['Stockholm, Sweden', 'Stockholm', 'Sweden', 7],
  ['Abu Dhabi, UAE', 'Abu Dhabi', 'United Arab Emirates', 8],
  ['Doha, Qatar', 'Doha', 'Qatar', 8],
  ['Honolulu, Hawaii', 'Honolulu', 'United States', 10],
  ['Maui, Hawaii', 'Kahului', 'United States', 10],
  ['Hilo, Hawaii', 'Hilo', 'United States', 10],
  ['Ensenada, Mexico', 'Ensenada', 'Mexico', 6],
  ['Key West, Florida', 'Key West', 'United States', 1],
  ['Perfect Day at CocoCay', 'CocoCay', 'Bahamas', 2],
];

const ports = portRows.map(([name, city, country, dest], i) => ({ id: i + 1, name, city, country, destination_id: dest }));

// shipId, name, depPortId, depDate, nights, featured
const cruiseRows = [
  [1, '7-Night Eastern Caribbean & Perfect Day', 1, '2026-11-08', 7, 1],
  [1, '7-Night Western Caribbean & Perfect Day', 1, '2026-12-06', 7, 0],
  [2, '8-Night Eastern Caribbean Holiday', 1, '2026-12-20', 8, 1],
  [3, '7-Night Western Caribbean from Miami', 1, '2027-01-17', 7, 0],
  [4, '4-Night Bahamas Getaway', 1, '2026-11-13', 4, 0],
  [4, '5-Night Bahamas & Perfect Day', 2, '2027-02-08', 5, 0],
  [5, '9-Night Greek Isles & Turkey', 5, '2027-04-10', 9, 1],
  [6, '7-Night Western Caribbean from Galveston', 4, '2026-11-15', 7, 0],
  [6, '7-Night Western Caribbean Thanksgiving', 4, '2026-11-22', 7, 0],
  [7, '6-Night Eastern Caribbean from Port Canaveral', 2, '2027-01-10', 6, 0],
  [8, '7-Night Western Caribbean from Miami', 1, '2027-02-14', 7, 0],
  [9, '7-Night Eastern Caribbean', 2, '2027-03-07', 7, 0],
  [10, '7-Night Bermuda & Bahamas', 2, '2027-05-02', 7, 0],
  [10, '9-Night Mediterranean: Italy, France & Spain', 6, '2027-06-05', 9, 1],
  [11, '7-Night Alaska Inside Passage', 10, '2027-05-16', 7, 1],
  [11, '7-Night Alaska Inside Passage (June)', 10, '2027-06-13', 7, 0],
  [12, '7-Night Eastern Caribbean from Miami', 1, '2026-12-05', 7, 0],
  [13, '10-Night Southern Caribbean', 3, '2027-01-22', 10, 0],
  [14, '7-Night Western Mediterranean', 5, '2027-04-17', 7, 1],
  [14, '7-Night Western Mediterranean (May)', 5, '2027-05-15', 7, 0],
  [15, '7-Night Bahamas & Florida', 2, '2026-11-21', 7, 0],
  [16, '10-Night Eastern & Western Caribbean', 2, '2027-02-05', 10, 0],
  [17, '7-Night Eastern Mediterranean', 15, '2027-04-24', 7, 0],
  [18, '12-Night Mediterranean Grand Voyage', 5, '2027-05-08', 12, 1],
  [19, '7-Night Alaska with Glacier Bay', 10, '2027-06-06', 7, 1],
  [20, '7-Night Eastern Caribbean from Ft. Lauderdale', 3, '2027-01-09', 7, 0],
  [21, '7-Night Eastern Caribbean', 3, '2026-12-12', 7, 1],
  [22, '7-Night Alaska Dawes Glacier', 10, '2027-07-11', 7, 0],
  [23, '11-Night Greek Isles & Italy', 6, '2027-06-19', 11, 0],
  [24, '7-Night Italy, France & Spain', 5, '2026-11-14', 7, 1],
  [24, '7-Night Western Mediterranean Winter', 15, '2026-12-05', 7, 0],
  [24, '14-Night Transatlantic Repositioning', 15, '2027-03-20', 14, 0],
  [25, '7-Night UAE, Qatar & Bahrain', 13, '2027-01-16', 7, 1],
  [25, '7-Night Arabian Gulf (Feb)', 13, '2027-02-13', 7, 0],
  [26, '7-Night Western Mediterranean', 7, '2027-04-03', 7, 0],
  [26, '8-Night Eastern Mediterranean', 7, '2027-05-01', 8, 0],
  [27, '4-Night Bahamas from Port Canaveral', 2, '2026-11-30', 4, 1],
  [27, '5-Night Bahamas & Castaway Cay', 2, '2027-01-04', 5, 0],
  [28, '7-Night Eastern Caribbean', 2, '2027-02-20', 7, 0],
  [29, '7-Night Alaska Inside Passage', 10, '2027-06-27', 7, 0],
  [30, '7-Night Mexican Riviera', 11, '2026-12-19', 7, 0],
  [30, '7-Night Mexican Riviera (Jan)', 11, '2027-01-16', 7, 0],
  [31, '5-Night Dominican Daze', 1, '2026-11-18', 5, 1],
  [31, '7-Night Caribbean & Bimini', 1, '2027-02-28', 7, 0],
  [32, '7-Night French Daze & Ibiza Nights', 5, '2027-06-12', 7, 1],
  [32, '10-Night Irresistible Med', 5, '2027-07-03', 10, 0],
  [19, '7-Night Alaska Inside Passage (Aug)', 10, '2027-08-08', 7, 0],
  [5, '10-Night Canary Islands & Iberia', 14, '2026-11-21', 10, 0],
  [9, '14-Night Northern Europe & Fjords', 14, '2027-06-26', 14, 0],
  [23, '7-Night Adriatic & Greece', 8, '2027-05-22', 7, 1],
];

const NAME_DESTS = [
  [/Bahamas/i, 2], [/Caribbean|Bermuda/i, 1], [/Alaska/i, 5],
  [/Mediterranean|Italy, France|Ibiza|Canary/i, 3], [/Greek|Adriatic/i, 4],
  [/Mexican Riviera/i, 6], [/UAE|Arabian/i, 8], [/Transatlantic/i, 9],
  [/Northern Europe|Fjords/i, 7], [/Hawaii/i, 10],
];

const cruises = cruiseRows.map(([shipId, name, depPort, depDate, nights, featured], i) => {
  const dep = new Date(depDate + 'T12:00:00Z');
  const ret = new Date(dep);
  ret.setUTCDate(ret.getUTCDate() + nights);
  const ship = ships.find((s) => s.id === shipId);
  const base = 55 + ((i + 1) * 37) % 90;
  const destIds = new Set([ports.find((p) => p.id === depPort)?.destination_id]);
  NAME_DESTS.forEach(([re, did]) => re.test(name) && destIds.add(did));

  const cid = i + 1;
  const depPortObj = ports.find((p) => p.id === depPort);
  const portPool = ports.filter((p) => p.id !== depPort && destIds.has(p.destination_id));
  const fallbackPool = ports.filter((p) => p.id !== depPort);
  const pool = portPool.length ? portPool : fallbackPool;

  const itinerary = [{ id: cid * 100 + 1, cruise_id: cid, day_number: 1, port_id: depPort, port_name: depPortObj.name, arrival_time: null, departure_time: '5:00 PM', description: 'Embark — settle in and sail away.' }];
  for (let d = 2; d <= nights; d++) {
    if (d % 2 === 0) {
      const port = pool[(d * 31 + i) % pool.length];
      itinerary.push({ id: cid * 100 + d, cruise_id: cid, day_number: d, port_id: port.id, port_name: port.name, arrival_time: '8:00 AM', departure_time: '6:00 PM', description: `Port day at ${port.name}` });
    } else {
      itinerary.push({ id: cid * 100 + d, cruise_id: cid, day_number: d, port_id: null, port_name: null, arrival_time: null, departure_time: null, description: "Day at sea — enjoy the ship's pools, shows and dining." });
    }
  }
  itinerary.push({ id: cid * 100 + nights + 1, cruise_id: cid, day_number: nights + 1, port_id: depPort, port_name: ports.find((p) => p.id === depPort).name, arrival_time: '7:00 AM', departure_time: null, description: 'Disembark — thank you for sailing with us.' });

  return {
    id: cid, ship_id: shipId, name, slug: slugify(name) + '-' + cid,
    departure_port_id: depPort, return_port_id: depPort,
    departure_date: depDate, return_date: ret.toISOString().slice(0, 10),
    nights, image_url: img('cruise-' + cid), is_featured: !!featured,
    description: '',
    ship_name: ship.name, ship_slug: ship.slug, ship_rating: ship.rating, ship_image: ship.image_url,
    line_name: lines.find((l) => l.id === ship.cruise_line_id).name,
    line_slug: lines.find((l) => l.id === ship.cruise_line_id).slug,
    line_rating: lines.find((l) => l.id === ship.cruise_line_id).rating,
    departure_port: ports.find((p) => p.id === depPort).name,
    return_port: ports.find((p) => p.id === depPort).name,
    from_price: Math.round(base * nights), taxes: Math.round(14.5 * nights),
    itinerary,
    pricing: [
      { id: cid * 10 + 1, cruise_id: cid, cabin_category: 'interior', price: Math.round(base * nights), original_price: Math.round(base * nights * 1.35), taxes: Math.round(14.5 * nights), availability: 24 },
      { id: cid * 10 + 2, cruise_id: cid, cabin_category: 'oceanview', price: Math.round(base * nights * 1.35), original_price: Math.round(base * nights * 1.7), taxes: Math.round(14.5 * nights), availability: 18 },
      { id: cid * 10 + 3, cruise_id: cid, cabin_category: 'balcony', price: Math.round(base * nights * 1.9), original_price: Math.round(base * nights * 2.3), taxes: Math.round(15.5 * nights), availability: 14 },
      { id: cid * 10 + 4, cruise_id: cid, cabin_category: 'suite', price: Math.round(base * nights * 3.4), original_price: Math.round(base * nights * 4.1), taxes: Math.round(17.5 * nights), availability: 8 },
    ],
    destination_ids: [...destIds].filter(Boolean),
  };
});

const deals = [
  { id: 1, cruise_id: 1, title: 'Black Friday Cruise Sale', badge: 'UP TO 40% OFF', description: 'Save big on Caribbean sailings aboard Wonder of the Seas.', discount_pct: 40, expires_at: '2026-11-30' },
  { id: 2, cruise_id: 30, title: 'Costa Diadema Med Special', badge: '2 FOR 1', description: 'Second guest sails free on select Diadema Mediterranean departures.', discount_pct: 50, expires_at: '2026-11-15' },
  { id: 3, cruise_id: 19, title: 'MSC World Europa Launch Offer', badge: 'LAST MINUTE', description: 'Last-minute Med fares from Barcelona on the new World Europa.', discount_pct: 30, expires_at: '2026-12-01' },
  { id: 4, cruise_id: 15, title: 'Alaska Early Booking Bonus', badge: 'EARLY BIRD', description: 'Book 2027 Alaska now — free balcony upgrade on Norwegian Encore.', discount_pct: null, expires_at: '2027-01-31' },
  { id: 5, cruise_id: 24, title: 'Sun Princess Grand Voyage', badge: 'EXCLUSIVE', description: 'Exclusive onboard credit of $200 on Sphere-class sailings.', discount_pct: null, expires_at: '2027-02-28' },
  { id: 6, cruise_id: 33, title: 'Arabian Gulf Winter Sun', badge: 'KIDS SAIL FREE', description: "Kids under 12 sail free on Smeralda's UAE season.", discount_pct: null, expires_at: '2026-12-31' },
  { id: 7, cruise_id: 37, title: 'Disney Wish Family Deal', badge: 'LIMITED TIME', description: 'Reduced deposit and up to 25% off select Bahamas sailings.', discount_pct: 25, expires_at: '2026-11-20' },
  { id: 8, cruise_id: 43, title: 'Virgin Voyages Sailor Loot', badge: '$300 CREDIT', description: '$300 onboard credit on Scarlet Lady Caribbean sailings.', discount_pct: null, expires_at: '2026-12-15' },
];

cruises.forEach((c) => {
  const deal = deals.find((d) => d.cruise_id === c.id);
  if (deal) c.deal_badge = deal.badge;
});

const bookings = new Map();
const contacts = [];
const today = () => new Date().toISOString().slice(0, 10);
const upcoming = () => cruises.filter((c) => c.departure_date >= today());

export async function connect() { /* no-op */ }

export async function listCruises(q) {
  let rows = upcoming();
  const csv = (v) => (v ? String(v).split(',').map(Number) : null);
  const lines_ = csv(q.line), ships_ = csv(q.ship), ports_ = csv(q.port), months = q.month ? String(q.month).split(',') : null;

  if (q.destination) rows = rows.filter((c) => c.destination_ids.includes(Number(q.destination)));
  if (lines_) rows = rows.filter((c) => lines_.includes(ships.find((s) => s.id === c.ship_id).cruise_line_id));
  if (ships_) rows = rows.filter((c) => ships_.includes(c.ship_id));
  if (ports_) rows = rows.filter((c) => ports_.includes(c.departure_port_id));
  if (months) rows = rows.filter((c) => months.includes(c.departure_date.slice(0, 7)));
  if (q.nights_min) rows = rows.filter((c) => c.nights >= Number(q.nights_min));
  if (q.nights_max) rows = rows.filter((c) => c.nights <= Number(q.nights_max));
  if (q.price_min) rows = rows.filter((c) => c.from_price >= Number(q.price_min));
  if (q.price_max) rows = rows.filter((c) => c.from_price <= Number(q.price_max));
  if (q.featured === '1' || q.featured === 'true') rows = rows.filter((c) => c.is_featured);
  if (q.q) {
    const needle = String(q.q).toLowerCase();
    rows = rows.filter((c) => [c.name, c.ship_name, c.line_name, c.departure_port].some((v) => v.toLowerCase().includes(needle)));
  }

  const sorts = {
    price_asc: (a, b) => a.from_price - b.from_price,
    price_desc: (a, b) => b.from_price - a.from_price,
    date_asc: (a, b) => a.departure_date.localeCompare(b.departure_date),
    nights_asc: (a, b) => a.nights - b.nights,
    nights_desc: (a, b) => b.nights - a.nights,
    rating_desc: (a, b) => b.ship_rating - a.ship_rating,
  };
  rows.sort(sorts[q.sort] || sorts.date_asc);

  const page = Math.max(1, Number(q.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(q.page_size) || 10));
  const total = rows.length;
  const data = rows.slice((page - 1) * pageSize, page * pageSize);
  return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getCruise(id) {
  const c = cruises.find((x) => x.id === Number(id));
  if (!c) return null;
  const ship = ships.find((s) => s.id === c.ship_id);
  return {
    ...c,
    passenger_capacity: ship.passenger_capacity, crew: ship.crew, year_built: ship.year_built,
    year_refurbished: ship.year_refurbished, tonnage: ship.tonnage, length_m: ship.length_m,
    speed_knots: ship.speed_knots, ship_description: ship.description,
    deals: deals.filter((d) => d.cruise_id === c.id),
    destinations: c.destination_ids.map((d) => destinations.find((x) => x.id === d)),
  };
}

export async function getFilterMeta() {
  const rows = upcoming();
  const usedPorts = new Set(rows.map((c) => c.departure_port_id));
  const usedDests = new Set(rows.flatMap((c) => c.destination_ids));
  return {
    lines: lines.map(({ id, name, slug }) => ({ id, name, slug })),
    ships: ships.map(({ id, name, slug, cruise_line_id }) => ({ id, name, slug, cruise_line_id })),
    ports: ports.filter((p) => usedPorts.has(p.id)).map(({ id, name }) => ({ id, name })),
    destinations: destinations.filter((d) => usedDests.has(d.id)).map(({ id, name, slug }) => ({ id, name, slug })),
    months: [...new Set(rows.map((c) => c.departure_date.slice(0, 7)))].sort(),
    min_price: Math.min(...rows.map((c) => c.from_price)),
    max_price: Math.max(...rows.map((c) => c.from_price)),
    min_nights: Math.min(...rows.map((c) => c.nights)),
    max_nights: Math.max(...rows.map((c) => c.nights)),
  };
}

export async function getLines() { return lines; }

export async function getLine(slug) {
  const line = lines.find((l) => l.slug === slug);
  if (!line) return null;
  return { ...line, ships: ships.filter((s) => s.cruise_line_id === line.id) };
}

export async function getShip(slug) {
  const ship = ships.find((s) => s.slug === slug);
  if (!ship) return null;
  const line = lines.find((l) => l.id === ship.cruise_line_id);
  return {
    ...ship, line_name: line.name, line_slug: line.slug,
    cruises: upcoming().filter((c) => c.ship_id === ship.id)
      .map((c) => ({ id: c.id, name: c.name, slug: c.slug, departure_date: c.departure_date, nights: c.nights, image_url: c.image_url, departure_port: c.departure_port, from_price: c.from_price })),
  };
}

export async function getDestinations() { return destinations; }

export async function getDestination(slug) { return destinations.find((d) => d.slug === slug) || null; }

export async function getDeals() {
  const t = today();
  return deals.filter((d) => !d.expires_at || d.expires_at >= t).map((d) => {
    const c = cruises.find((x) => x.id === d.cruise_id);
    return { ...d, cruise_name: c?.name, cruise_slug: c?.slug, departure_date: c?.departure_date, nights: c?.nights, image_url: c?.image_url, ship_name: c?.ship_name, line_name: c?.line_name, from_price: c?.from_price };
  });
}

export async function createBooking(b) {
  const ref = 'CD' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const booking = { id: bookings.size + 1, booking_ref: ref, status: 'CONFIRMED', created_at: new Date().toISOString(), ...b };
  bookings.set(ref, booking);
  return booking;
}

export async function getBooking(ref) {
  const b = bookings.get(ref);
  if (!b) return null;
  const c = cruises.find((x) => x.id === b.cruise_id);
  return { ...b, cruise_name: c.name, departure_date: c.departure_date, nights: c.nights, image_url: c.image_url, ship_name: c.ship_name, line_name: c.line_name, departure_port: c.departure_port };
}

export async function createContact(m) {
  const row = { id: contacts.length + 1, status: 'NEW', created_at: new Date().toISOString(), ...m };
  contacts.push(row);
  return row;
}

// ------------------------- generic admin CRUD -------------------------
// Operates on the in-memory collections. Child tables (itinerary_days,
// cruise_pricing) live inside their parent cruise objects.

const ROOT_TABLES = {
  cruise_lines: () => lines,
  ships: () => ships,
  destinations: () => destinations,
  ports: () => ports,
  cruises: () => cruises,
  deals: () => deals,
  bookings: () => [...bookings.values()],
  contact_messages: () => contacts,
  itinerary_days: () => cruises.flatMap((c) => c.itinerary),
  cruise_pricing: () => cruises.flatMap((c) => c.pricing),
};

const CHILD_PARENT = { itinerary_days: 'itinerary', cruise_pricing: 'pricing' };

const nextId = (rows) => Math.max(0, ...rows.map((r) => r.id)) + 1;

function normalizeCruise(c) {
  const ship = ships.find((s) => s.id === Number(c.ship_id));
  const line = ship && lines.find((l) => l.id === ship.cruise_line_id);
  const depPort = ports.find((p) => p.id === Number(c.departure_port_id));
  const retPort = ports.find((p) => p.id === Number(c.return_port_id)) || depPort;
  c.ship_id = Number(c.ship_id);
  c.departure_port_id = Number(c.departure_port_id);
  c.return_port_id = retPort ? retPort.id : c.departure_port_id;
  c.nights = Number(c.nights);
  c.departure_date = String(c.departure_date).slice(0, 10);
  if (!c.return_date) {
    const d = new Date(c.departure_date + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + c.nights);
    c.return_date = d.toISOString().slice(0, 10);
  } else {
    c.return_date = String(c.return_date).slice(0, 10);
  }
  c.ship_name = ship?.name ?? '';
  c.ship_slug = ship?.slug ?? '';
  c.ship_rating = ship?.rating ?? 0;
  c.ship_image = ship?.image_url ?? '';
  c.line_name = line?.name ?? '';
  c.line_slug = line?.slug ?? '';
  c.line_rating = line?.rating ?? 0;
  c.departure_port = depPort?.name ?? '';
  c.return_port = retPort?.name ?? '';
  if (!c.image_url) c.image_url = img(`cruise-${c.id}`);
  if (!c.slug) c.slug = slugify(c.name) + '-' + c.id;
  if (!Array.isArray(c.itinerary)) c.itinerary = [];
  if (!Array.isArray(c.pricing) || c.pricing.length === 0) {
    const base = c.from_price && c.nights ? c.from_price / c.nights : 90;
    const n = c.nights || 7;
    c.pricing = ['interior', 'oceanview', 'balcony', 'suite'].map((cat, i) => ({
      id: c.id * 10 + i + 1, cruise_id: c.id, cabin_category: cat,
      price: Math.round(base * n * [1, 1.35, 1.9, 3.4][i]),
      original_price: Math.round(base * n * [1.35, 1.7, 2.3, 4.1][i]),
      taxes: Math.round(14.5 * n), availability: 20,
    }));
  }
  if (!Array.isArray(c.destination_ids)) c.destination_ids = [];
  if (c.destination_ids.length === 0 && depPort?.destination_id) {
    const destIds = new Set([depPort.destination_id]);
    NAME_DESTS.forEach(([re, did]) => re.test(c.name) && destIds.add(did));
    c.destination_ids = [...destIds];
  }
  const interior = c.pricing.find((p) => p.cabin_category === 'interior') || c.pricing[0];
  c.from_price = interior?.price ?? 0;
  c.taxes = interior?.taxes ?? 0;
  return c;
}

function findChild(table, id) {
  for (const c of cruises) {
    const arr = c[CHILD_PARENT[table]];
    const idx = arr.findIndex((r) => r.id === Number(id));
    if (idx !== -1) return { parent: c, arr, idx, row: arr[idx] };
  }
  return null;
}

export async function adminList(table, filters = {}) {
  const rows = ROOT_TABLES[table]();
  if (filters.cruise_id) return rows.filter((r) => r.cruise_id === Number(filters.cruise_id));
  return rows;
}

export async function adminCreate(table, body) {
  const data = { ...body };
  if (CHILD_PARENT[table]) {
    const cruise = cruises.find((c) => c.id === Number(data.cruise_id));
    if (!cruise) throw new Error('Parent cruise not found');
    const arr = cruise[CHILD_PARENT[table]];
    const row = { id: nextId(cruises.flatMap((c) => c[CHILD_PARENT[table]])), ...data };
    if (table === 'itinerary_days' && row.port_id) {
      row.port_name = ports.find((p) => p.id === Number(row.port_id))?.name ?? null;
      row.port_id = Number(row.port_id);
    }
    if (table === 'cruise_pricing') {
      ['price', 'original_price', 'taxes'].forEach((k) => { row[k] = Number(row[k] ?? 0); });
      row.availability = Number(row.availability ?? 0);
    }
    if (row.day_number !== undefined) row.day_number = Number(row.day_number);
    arr.push(row);
    normalizeCruise(cruise);
    return row;
  }

  const rows = ROOT_TABLES[table]();
  if (!data.slug && data.name) data.slug = slugify(data.name);
  const row = { id: nextId(rows), ...data };
  if (table === 'cruises') normalizeCruise(row);
  if (table === 'bookings') { bookings.set(row.booking_ref || `CD${row.id}`, row); return row; }
  rows.push(row);
  return row;
}

export async function adminUpdate(table, id, body) {
  const data = { ...body };
  if (!data.slug && data.name) data.slug = slugify(data.name);

  if (CHILD_PARENT[table]) {
    const hit = findChild(table, id);
    if (!hit) return null;
    Object.assign(hit.row, data);
    if (table === 'itinerary_days' && 'port_id' in data) {
      hit.row.port_name = ports.find((p) => p.id === Number(hit.row.port_id))?.name ?? null;
    }
    normalizeCruise(hit.parent);
    return hit.row;
  }

  if (table === 'bookings') {
    const row = [...bookings.values()].find((b) => b.id === Number(id));
    if (!row) return null;
    Object.assign(row, data);
    return row;
  }

  const rows = ROOT_TABLES[table]();
  const row = rows.find((r) => r.id === Number(id));
  if (!row) return null;
  Object.assign(row, data);
  if (table === 'cruises') normalizeCruise(row);
  return row;
}

export async function adminDelete(table, id) {
  if (CHILD_PARENT[table]) {
    const hit = findChild(table, id);
    if (hit) { hit.arr.splice(hit.idx, 1); normalizeCruise(hit.parent); }
    return;
  }
  if (table === 'bookings') {
    const hit = [...bookings.entries()].find(([, b]) => b.id === Number(id));
    if (hit) bookings.delete(hit[0]);
    return;
  }
  const rows = ROOT_TABLES[table]();
  const idx = rows.findIndex((r) => r.id === Number(id));
  if (idx !== -1) rows.splice(idx, 1);
}
