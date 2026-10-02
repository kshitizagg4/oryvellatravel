-- =============================================================
-- Seed data for CruiseDB — run AFTER schema.sql
-- =============================================================


-- ---------- Cruise lines ----------
INSERT INTO dbo.cruise_lines (name, slug, logo_url, tagline, description, rating, ship_count) VALUES
('Royal Caribbean',   'royal-caribbean',  NULL, 'Come Seek',        'Innovative mega-ships packed with thrills — surf simulators, skydiving, Broadway shows.', 4.5, 5),
('Carnival Cruise Line','carnival',       NULL, 'Choose Fun',       'The Fun Ships — casual, high-energy cruising at great value.', 4.2, 4),
('Norwegian Cruise Line','norwegian',     NULL, 'Feel Free',        'Freestyle cruising with no fixed dining times and award-winning entertainment.', 4.4, 4),
('MSC Cruises',       'msc-cruises',      NULL, 'Discover the future of cruising', 'European style, Mediterranean flair, and some of the newest ships at sea.', 4.3, 4),
('Princess Cruises',  'princess',         NULL, 'Come back new',    'Premium cruising with MedallionClass service and refined dining.', 4.5, 3),
('Celebrity Cruises', 'celebrity',        NULL, 'Nothing comes close', 'Modern luxury — edgy design, fine dining, and immersive itineraries.', 4.6, 3),
('Costa Cruises',     'costa',            NULL, 'Live your wonder', 'Italy''s finest — vibrant, family-friendly cruising with Mediterranean soul.', 4.1, 3),
('Disney Cruise Line','disney',           NULL, 'Where magic meets the sea', 'Storytelling, character experiences and family fun, Disney style.', 4.7, 2),
('Holland America Line','holland-america',NULL, 'Savor the journey','Classic premium cruising with culinary excellence and live music.', 4.4, 2),
('Virgin Voyages',    'virgin-voyages',   NULL, 'Set sail the Virgin way', 'Adults-only, design-led ships with no buffets and no kids.', 4.5, 2);
GO

-- ---------- Ships ----------
INSERT INTO dbo.ships (cruise_line_id, name, slug, image_url, passenger_capacity, crew, year_built, year_refurbished, tonnage, length_m, speed_knots, description, rating) VALUES
(1,'Wonder of the Seas','wonder-of-the-seas','https://picsum.photos/seed/wonder-seas/900/520',6988,2300,2022,NULL,236857,362,22,'The world''s largest cruise ship with 8 distinct neighborhoods.',4.7),
(1,'Icon of the Seas','icon-of-the-seas','https://picsum.photos/seed/icon-seas/900/520',7600,2350,2024,NULL,248663,365,22,'A new class of vacation — the largest waterpark at sea.',4.8),
(1,'Symphony of the Seas','symphony-of-the-seas','https://picsum.photos/seed/symphony-seas/900/520',6680,2200,2018,2023,228081,361,22,'Oasis-class giant with the Ultimate Abyss slide and Central Park.',4.6),
(1,'Freedom of the Seas','freedom-of-the-seas','https://picsum.photos/seed/freedom-seas/900/520',4515,1360,2006,2020,154407,339,22,'Amplified Freedom-class favorite sailing the Caribbean.',4.3),
(1,'Odyssey of the Seas','odyssey-of-the-seas','https://picsum.photos/seed/odyssey-seas/900/520',5498,1400,2021,NULL,169379,347,22,'Quantum Ultra-class ship sailing the Med and Caribbean.',4.5),
(2,'Carnival Jubilee','carnival-jubilee','https://picsum.photos/seed/carnival-jubilee/900/520',6631,1735,2023,NULL,183521,345,22,'Excel-class flagship sailing from Galveston.',4.5),
(2,'Carnival Horizon','carnival-horizon','https://picsum.photos/seed/carnival-horizon/900/520',4960,1450,2018,NULL,133500,323,23,'Vista-class fun with SkyRide and IMAX at sea.',4.3),
(2,'Carnival Breeze','carnival-breeze','https://picsum.photos/seed/carnival-breeze/900/520',3690,1386,2012,2022,130000,306,22,'Dream-class ship loved for Caribbean getaways.',4.2),
(2,'Carnival Venezia','carnival-venezia','https://picsum.photos/seed/carnival-venezia/900/520',5076,1393,2019,NULL,135500,323,22,'Carnival Fun Italian Style — Venice-inspired design.',4.4),
(3,'Norwegian Prima','norwegian-prima','https://picsum.photos/seed/norwegian-prima/900/520',3215,1388,2022,NULL,143535,294,22,'Prima-class ship with the Prima Speedway racetrack.',4.6),
(3,'Norwegian Encore','norwegian-encore','https://picsum.photos/seed/norwegian-encore/900/520',3998,1735,2019,NULL,169116,333,22,'Breakaway Plus-class with the largest racetrack at sea.',4.5),
(3,'Norwegian Escape','norwegian-escape','https://picsum.photos/seed/norwegian-escape/900/520',4218,1733,2015,2022,164998,326,23,'Freestyle favorite sailing the Caribbean from Miami.',4.4),
(3,'Norwegian Pearl','norwegian-pearl','https://picsum.photos/seed/norwegian-pearl/900/520',2394,1100,2006,2021,93530,294,25,'Jewel-class gem ideal for Alaska and the Caribbean.',4.2),
(4,'MSC World Europa','msc-world-europa','https://picsum.photos/seed/msc-europa/900/520',6774,2138,2022,NULL,205700,333,23,'Futuristic LNG-powered flagship of the World class.',4.6),
(4,'MSC Seascape','msc-seascape','https://picsum.photos/seed/msc-seascape/900/520',5877,1648,2022,NULL,169400,339,22,'Seaside EVO-class with the iconic Bridge of Sighs.',4.5),
(4,'MSC Meraviglia','msc-meraviglia','https://picsum.photos/seed/msc-meraviglia/900/520',5642,1536,2017,2023,171598,315,23,'Meraviglia-class ship with a stunning LED promenade.',4.4),
(4,'MSC Divina','msc-divina','https://picsum.photos/seed/msc-divina/900/520',4351,1388,2012,2021,139072,333,23,'Sophisticated Fantasia-class ship inspired by Sophia Loren.',4.3),
(5,'Sun Princess','sun-princess','https://picsum.photos/seed/sun-princess/900/520',4300,1550,2024,NULL,175500,345,22,'First Sphere-class ship — next-generation MedallionClass.',4.7),
(5,'Regal Princess','regal-princess','https://picsum.photos/seed/regal-princess/900/520',3560,1346,2014,2022,142714,330,22,'Royal-class elegance sailing Alaska and Europe.',4.5),
(5,'Caribbean Princess','caribbean-princess','https://picsum.photos/seed/caribbean-princess/900/520',3140,1200,2004,2022,112894,290,22,'Grand-class ship purpose-fit for Caribbean itineraries.',4.3),
(6,'Celebrity Beyond','celebrity-beyond','https://picsum.photos/seed/celebrity-beyond/900/520',3952,1416,2022,NULL,140600,306,22,'Edge-series flagship with the Magic Carpet platform.',4.8),
(6,'Celebrity Reflection','celebrity-reflection','https://picsum.photos/seed/celebrity-reflection/900/520',3046,1271,2012,2022,125366,319,24,'Solstice-series ship with the famous Lawn Club.',4.6),
(6,'Celebrity Apex','celebrity-apex','https://picsum.photos/seed/celebrity-apex/900/520',3405,1320,2021,NULL,129500,306,22,'Edge-series innovation sailing Europe and the Caribbean.',4.7),
(7,'Costa Diadema','costa-diadema','https://picsum.photos/seed/costa-diadema/900/520',4947,1253,2014,2023,133000,306,21,'Flagship of the Costa fleet — the largest ship flying the Italian flag.',4.3),
(7,'Costa Smeralda','costa-smeralda','https://picsum.photos/seed/costa-smeralda/900/520',6554,1682,2019,NULL,185010,337,21,'LNG-powered Excellence-class ship inspired by Sardinia.',4.4),
(7,'Costa Fascinosa','costa-fascinosa','https://picsum.photos/seed/costa-fascinosa/900/520',3800,1110,2012,2022,114500,290,22,'Concordia-class ship themed on cinema and theatre.',4.1),
(8,'Disney Wish','disney-wish','https://picsum.photos/seed/disney-wish/900/520',4000,1558,2022,NULL,144000,341,23,'Enchanting ship where fairy tales come to life.',4.8),
(8,'Disney Fantasy','disney-fantasy','https://picsum.photos/seed/disney-fantasy/900/520',4000,1458,2012,2023,130000,340,25,'Dream-class sister featuring the AquaDuck water coaster.',4.7),
(9,'Nieuw Statendam','nieuw-statendam','https://picsum.photos/seed/nieuw-statendam/900/520',2666,1036,2018,NULL,99500,299,22,'Pinnacle-class ship with Music Walk and fine dining.',4.5),
(9,'Koningsdam','koningsdam','https://picsum.photos/seed/koningsdam/900/520',2650,1036,2016,2023,99863,299,22,'First Pinnacle-class ship, named for the Dutch king.',4.4),
(10,'Scarlet Lady','scarlet-lady','https://picsum.photos/seed/scarlet-lady/900/520',2770,1160,2021,NULL,110000,278,22,'Virgin''s adults-only flagship sailing the Caribbean.',4.6),
(10,'Valiant Lady','valiant-lady','https://picsum.photos/seed/valiant-lady/900/520',2770,1160,2022,NULL,110000,278,22,'Mediterranean-focused sister with bold dining and design.',4.6);
GO

-- ---------- Destinations ----------
INSERT INTO dbo.destinations (name, slug, region, image_url, description) VALUES
('Caribbean','caribbean','Americas','https://picsum.photos/seed/caribbean/900/520','Turquoise waters, white sand beaches and island hopping across the West Indies.'),
('Bahamas','bahamas','Americas','https://picsum.photos/seed/bahamas/900/520','Quick getaways to Nassau, private islands and crystal-clear lagoons.'),
('Western Mediterranean','western-mediterranean','Europe','https://picsum.photos/seed/western-med/900/520','Barcelona, Rome, the French Riviera and the islands of Italy and Spain.'),
('Eastern Mediterranean','eastern-mediterranean','Europe','https://picsum.photos/seed/eastern-med/900/520','Greek Isles, Adriatic gems and the wonders of the ancient world.'),
('Alaska','alaska','Americas','https://picsum.photos/seed/alaska/900/520','Glaciers, fjords and frontier towns — nature at its most majestic.'),
('Mexican Riviera','mexican-riviera','Americas','https://picsum.photos/seed/mexican-riviera/900/520','Sun-soaked Pacific ports from Cabo to Puerto Vallarta.'),
('Northern Europe','northern-europe','Europe','https://picsum.photos/seed/northern-europe/900/520','Norwegian fjords, Baltic capitals and Scandinavian charm.'),
('Middle East','middle-east','Asia','https://picsum.photos/seed/middle-east/900/520','Dubai, Abu Dhabi and the Arabian Gulf''s modern marvels.'),
('Transatlantic','transatlantic','Multi-region','https://picsum.photos/seed/transatlantic/900/520','Classic ocean crossings between Europe and the Americas.'),
('South Pacific & Hawaii','south-pacific-hawaii','Oceania','https://picsum.photos/seed/south-pacific/900/520','Volcanic islands, Polynesian culture and endless Pacific horizons.');
GO

-- ---------- Ports ----------
INSERT INTO dbo.ports (name, city, country, destination_id) VALUES
('Miami, Florida','Miami','United States',1),
('Port Canaveral, Florida','Orlando','United States',2),
('Fort Lauderdale, Florida','Fort Lauderdale','United States',1),
('Galveston, Texas','Galveston','United States',6),
('Barcelona, Spain','Barcelona','Spain',3),
('Rome (Civitavecchia), Italy','Civitavecchia','Italy',3),
('Venice (Trieste), Italy','Trieste','Italy',4),
('Athens (Piraeus), Greece','Piraeus','Greece',4),
('Istanbul, Turkey','Istanbul','Turkey',4),
('Seattle, Washington','Seattle','United States',5),
('Los Angeles, California','Los Angeles','United States',6),
('San Juan, Puerto Rico','San Juan','Puerto Rico',1),
('Dubai, UAE','Dubai','United Arab Emirates',8),
('Southampton, England','Southampton','United Kingdom',7),
('Genoa, Italy','Genoa','Italy',3),
('Nassau, Bahamas','Nassau','Bahamas',2),
('Cozumel, Mexico','Cozumel','Mexico',1),
('Costa Maya, Mexico','Costa Maya','Mexico',1),
('Roatan, Honduras','Roatan','Honduras',1),
('St. Maarten','Philipsburg','St. Maarten',1),
('St. Thomas, USVI','Charlotte Amalie','US Virgin Islands',1),
('Aruba','Oranjestad','Aruba',1),
('Curacao','Willemstad','Curacao',1),
('Grand Cayman','George Town','Cayman Islands',1),
('Santorini, Greece','Thira','Greece',4),
('Mykonos, Greece','Mykonos','Greece',4),
('Kotor, Montenegro','Kotor','Montenegro',4),
('Dubrovnik, Croatia','Dubrovnik','Croatia',4),
('Naples, Italy','Naples','Italy',3),
('Marseille (Provence), France','Marseille','France',3),
('Palma de Mallorca, Spain','Palma','Spain',3),
('Valletta, Malta','Valletta','Malta',3),
('Juneau, Alaska','Juneau','United States',5),
('Ketchikan, Alaska','Ketchikan','United States',5),
('Skagway, Alaska','Skagway','United States',5),
('Victoria, BC','Victoria','Canada',5),
('Cabo San Lucas, Mexico','Cabo San Lucas','Mexico',6),
('Puerto Vallarta, Mexico','Puerto Vallarta','Mexico',6),
('Mazatlan, Mexico','Mazatlan','Mexico',6),
('Bergen, Norway','Bergen','Norway',7),
('Geiranger, Norway','Geiranger','Norway',7),
('Copenhagen, Denmark','Copenhagen','Denmark',7),
('Stockholm, Sweden','Stockholm','Sweden',7),
('Abu Dhabi, UAE','Abu Dhabi','United Arab Emirates',8),
('Doha, Qatar','Doha','Qatar',8),
('Honolulu, Hawaii','Honolulu','United States',10),
('Maui, Hawaii','Kahului','United States',10),
('Hilo, Hawaii','Hilo','United States',10),
('Ensenada, Mexico','Ensenada','Mexico',6),
('Key West, Florida','Key West','United States',1),
('Perfect Day at CocoCay','CocoCay','Bahamas',2);
GO

-- ---------- Cruises ----------
-- ship_id, name, slug, dep_port, ret_port, dep_date, nights, featured
INSERT INTO dbo.cruises (ship_id, name, slug, departure_port_id, return_port_id, departure_date, return_date, nights, image_url, description, is_featured) VALUES
(1,'7-Night Eastern Caribbean & Perfect Day','7-night-eastern-caribbean-perfect-day',1,1,'2026-11-08','2026-11-15',7,'https://picsum.photos/seed/cruise-1/900/520','Sail from Miami to Perfect Day at CocoCay, St. Thomas and St. Maarten aboard the world''s largest ship.',1),
(1,'7-Night Western Caribbean & Perfect Day','7-night-western-caribbean-perfect-day',1,1,'2026-12-06','2026-12-13',7,'https://picsum.photos/seed/cruise-2/900/520','Cozumel, Roatan, Costa Maya and a private island day at CocoCay.',0),
(2,'8-Night Eastern Caribbean Holiday','8-night-eastern-caribbean-holiday',1,1,'2026-12-20','2026-12-28',8,'https://picsum.photos/seed/cruise-3/900/520','Holiday sailing on Icon of the Seas — San Juan, St. Maarten and CocoCay.',1),
(3,'7-Night Western Caribbean from Miami','7-night-western-caribbean-miami',1,1,'2027-01-17','2027-01-24',7,'https://picsum.photos/seed/cruise-4/900/520','Classic Western Caribbean loop with Grand Cayman and Cozumel.',0),
(4,'4-Night Bahamas Getaway','4-night-bahamas-getaway',1,1,'2026-11-13','2026-11-17',4,'https://picsum.photos/seed/cruise-5/900/520','Quick escape to Nassau and Key West — perfect long weekend.',0),
(4,'5-Night Bahamas & Perfect Day','5-night-bahamas-perfect-day',2,2,'2027-02-08','2027-02-13',5,'https://picsum.photos/seed/cruise-6/900/520','From Port Canaveral to CocoCay and Nassau.',0),
(5,'9-Night Greek Isles & Turkey','9-night-greek-isles-turkey',5,5,'2027-04-10','2027-04-19',9,'https://picsum.photos/seed/cruise-7/900/520','Barcelona roundtrip via Naples, Santorini, Mykonos and Istanbul.',1),
(6,'7-Night Western Caribbean from Galveston','7-night-western-caribbean-galveston',4,4,'2026-11-15','2026-11-22',7,'https://picsum.photos/seed/cruise-8/900/520','Jubilee sails to Roatan, Costa Maya and Cozumel.',0),
(6,'7-Night Western Caribbean Thanksgiving','7-night-western-caribbean-thanksgiving',4,4,'2026-11-22','2026-11-29',7,'https://picsum.photos/seed/cruise-9/900/520','Thanksgiving week sailing — same great Western Caribbean route.',0),
(7,'6-Night Eastern Caribbean from Port Canaveral','6-night-eastern-caribbean-canaveral',2,2,'2027-01-10','2027-01-16',6,'https://picsum.photos/seed/cruise-10/900/520','St. Thomas, St. Maarten and San Juan on Carnival Horizon.',0),
(8,'7-Night Western Caribbean from Miami','7-night-western-caribbean-breeze',1,1,'2027-02-14','2027-02-21',7,'https://picsum.photos/seed/cruise-11/900/520','Grand Cayman, Cozumel and Costa Maya on Carnival Breeze.',0),
(9,'7-Night Eastern Caribbean from NYC Region','7-night-eastern-caribbean-venezia',2,2,'2027-03-07','2027-03-14',7,'https://picsum.photos/seed/cruise-12/900/520','Venezia brings Italian style to the Caribbean.',0),
(10,'7-Night Bermuda & Bahamas','7-night-bermuda-bahamas',2,2,'2027-05-02','2027-05-09',7,'https://picsum.photos/seed/cruise-13/900/520','Prima-class luxury to pink-sand Bermuda.',0),
(10,'9-Night Mediterranean: Italy, France & Spain','9-night-mediterranean-prima',6,6,'2027-06-05','2027-06-14',9,'https://picsum.photos/seed/cruise-14/900/520','Rome roundtrip through the glamorous Western Med.',1),
(11,'7-Night Alaska Inside Passage','7-night-alaska-inside-passage',10,10,'2027-05-16','2027-05-23',7,'https://picsum.photos/seed/cruise-15/900/520','Juneau, Ketchikan, Skagway and glacier viewing from Seattle.',1),
(11,'7-Night Alaska Inside Passage (June)','7-night-alaska-june',10,10,'2027-06-13','2027-06-20',7,'https://picsum.photos/seed/cruise-16/900/520','Peak-season Alaska with extended daylight hours.',0),
(12,'7-Night Eastern Caribbean from Miami','7-night-eastern-caribbean-escape',1,1,'2026-12-05','2026-12-12',7,'https://picsum.photos/seed/cruise-17/900/520','St. Thomas, Tortola and Great Stirrup Cay.',0),
(13,'10-Night Southern Caribbean','10-night-southern-caribbean-pearl',3,3,'2027-01-22','2027-02-01',10,'https://picsum.photos/seed/cruise-18/900/520','Aruba, Curacao and beyond on a Southern Caribbean odyssey.',0),
(14,'7-Night Western Mediterranean','7-night-western-med-europa',5,5,'2027-04-17','2027-04-24',7,'https://picsum.photos/seed/cruise-19/900/520','Barcelona, Marseille, Genoa, Naples and Palma on World Europa.',1),
(14,'7-Night Western Mediterranean (May)','7-night-western-med-europa-may',5,5,'2027-05-15','2027-05-22',7,'https://picsum.photos/seed/cruise-20/900/520','Spring Med sailing on the LNG-powered flagship.',0),
(15,'7-Night Bahamas & Florida','7-night-bahamas-seascape',2,2,'2026-11-21','2026-11-28',7,'https://picsum.photos/seed/cruise-21/900/520','Seascape sails to Nassau, Ocean Cay MSC Marine Reserve and more.',0),
(16,'10-Night Eastern & Western Caribbean','10-night-caribbean-meraviglia',2,2,'2027-02-05','2027-02-15',10,'https://picsum.photos/seed/cruise-22/900/520','Extended Caribbean journey combining east and west.',0),
(17,'7-Night Eastern Mediterranean','7-night-eastern-med-divina',15,15,'2027-04-24','2027-05-01',7,'https://picsum.photos/seed/cruise-23/900/520','Genoa roundtrip via Santorini, Mykonos and Istanbul.',0),
(18,'12-Night Mediterranean Grand Voyage','12-night-med-grand-voyage',5,5,'2027-05-08','2027-05-20',12,'https://picsum.photos/seed/cruise-24/900/520','Sphere-class Sun Princess across the best of the Med.',1),
(19,'7-Night Alaska with Glacier Bay','7-night-alaska-glacier-bay',10,10,'2027-06-06','2027-06-13',7,'https://picsum.photos/seed/cruise-25/900/520','Regal Princess through Glacier Bay National Park.',1),
(20,'7-Night Eastern Caribbean from Ft. Lauderdale','7-night-eastern-caribbean-princess',3,3,'2027-01-09','2027-01-16',7,'https://picsum.photos/seed/cruise-26/900/520','Princess Cays, St. Thomas and St. Maarten.',0),
(21,'7-Night Eastern Caribbean','7-night-eastern-caribbean-beyond',3,3,'2026-12-12','2026-12-19',7,'https://picsum.photos/seed/cruise-27/900/520','Celebrity Beyond to Perfect Day-adjacent ports and USVI.',1),
(22,'7-Night Alaska Dawes Glacier','7-night-alaska-dawes',10,10,'2027-07-11','2027-07-18',7,'https://picsum.photos/seed/cruise-28/900/520','Reflection cruises Endicott Arm and Dawes Glacier.',0),
(23,'11-Night Greek Isles & Italy','11-night-greek-isles-apex',6,6,'2027-06-19','2027-06-30',11,'https://picsum.photos/seed/cruise-29/900/520','Apex sails Rome roundtrip deep into the Aegean.',0),
(24,'7-Night Italy, France & Spain','7-night-italy-france-spain-diadema',5,5,'2026-11-14','2026-11-21',7,'https://picsum.photos/seed/cruise-30/900/520','Costa Diadema — Barcelona, Marseille, Genoa, Naples, Palma.',1),
(24,'7-Night Western Mediterranean Winter','7-night-med-diadema-winter',15,15,'2026-12-05','2026-12-12',7,'https://picsum.photos/seed/cruise-31/900/520','Diadema sails from Genoa through Spain and France.',0),
(24,'14-Night Transatlantic Repositioning','14-night-transatlantic-diadema',15,1,'2027-03-20','2027-04-03',14,'https://picsum.photos/seed/cruise-32/900/520','Cross the Atlantic aboard Diadema — Genoa to Miami.',0),
(25,'7-Night UAE, Qatar & Bahrain','7-night-uae-qatar-smeralda',13,13,'2027-01-16','2027-01-23',7,'https://picsum.photos/seed/cruise-33/900/520','Dubai, Abu Dhabi and Doha on the LNG-powered Smeralda.',1),
(25,'7-Night Arabian Gulf (Feb)','7-night-arabian-gulf-feb',13,13,'2027-02-13','2027-02-20',7,'https://picsum.photos/seed/cruise-34/900/520','Winter sun in the Emirates and Qatar.',0),
(26,'7-Night Western Mediterranean','7-night-med-fascinosa',7,7,'2027-04-03','2027-04-10',7,'https://picsum.photos/seed/cruise-35/900/520','Fascinosa sails Venice region to Croatia and Greece.',0),
(26,'8-Night Eastern Mediterranean','8-night-eastern-med-fascinosa',7,7,'2027-05-01','2027-05-09',8,'https://picsum.photos/seed/cruise-36/900/520','Dubrovnik, Kotor and the Greek Isles from Trieste.',0),
(27,'4-Night Bahamas from Port Canaveral','4-night-bahamas-disney-wish',2,2,'2026-11-30','2026-12-04',4,'https://picsum.photos/seed/cruise-37/900/520','Disney magic to Nassau and Castaway Cay.',1),
(27,'5-Night Bahamas & Castaway Cay','5-night-bahamas-wish',2,2,'2027-01-04','2027-01-09',5,'https://picsum.photos/seed/cruise-38/900/520','Extra day of magic on the Disney Wish.',0),
(28,'7-Night Eastern Caribbean','7-night-eastern-caribbean-fantasy',2,2,'2027-02-20','2027-02-27',7,'https://picsum.photos/seed/cruise-39/900/520','Fantasy sails to Tortola, St. Thomas and Castaway Cay.',0),
(29,'7-Night Alaska Inside Passage','7-night-alaska-statendam',10,10,'2027-06-27','2027-07-04',7,'https://picsum.photos/seed/cruise-40/900/520','Pinnacle-class comfort through the Inside Passage.',0),
(30,'7-Night Mexican Riviera','7-night-mexican-riviera-koningsdam',11,11,'2026-12-19','2026-12-26',7,'https://picsum.photos/seed/cruise-41/900/520','Cabo, Mazatlan and Puerto Vallarta from San Diego region.',0),
(30,'7-Night Mexican Riviera (Jan)','7-night-mexican-riviera-jan',11,11,'2027-01-16','2027-01-23',7,'https://picsum.photos/seed/cruise-42/900/520','Winter escape down Mexico''s Pacific coast.',0),
(31,'5-Night Dominican Daze','5-night-dominican-daze',1,1,'2026-11-18','2026-11-23',5,'https://picsum.photos/seed/cruise-43/900/520','Scarlet Lady to Puerto Plata and Bimini Beach Club.',1),
(31,'7-Night Caribbean & Bimini','7-night-caribbean-bimini',1,1,'2027-02-28','2027-03-07',7,'https://picsum.photos/seed/cruise-44/900/520','Adults-only sailing — Aruba, Curacao and Bimini.',0),
(32,'7-Night French Daze & Ibiza Nights','7-night-french-daze-ibiza',5,5,'2027-06-12','2027-06-19',7,'https://picsum.photos/seed/cruise-45/900/520','Barcelona, Marseille and an overnight in Ibiza.',1),
(32,'10-Night Irresistible Med','10-night-irresistible-med',5,5,'2027-07-03','2027-07-13',10,'https://picsum.photos/seed/cruise-46/900/520','Extended Med voyage with Ibiza overnight and Corsica.',0),
(19,'7-Night Alaska Inside Passage (Aug)','7-night-alaska-aug',10,10,'2027-08-08','2027-08-15',7,'https://picsum.photos/seed/cruise-47/900/520','Late-summer Alaska — best whale watching of the season.',0),
(5,'10-Night Canary Islands & Iberia','10-night-canary-iberia',14,14,'2026-11-21','2026-12-01',10,'https://picsum.photos/seed/cruise-48/900/520','Odyssey of the Seas from Southampton to the Canaries.',0),
(9,'14-Night Northern Europe & Fjords','14-night-northern-europe-fjords',14,14,'2027-06-26','2027-07-10',14,'https://picsum.photos/seed/cruise-49/900/520','Norwegian fjords, Copenhagen and Stockholm from Southampton.',0),
(23,'7-Night Adriatic & Greece','7-night-adriatic-greece-apex',8,8,'2027-05-22','2027-05-29',7,'https://picsum.photos/seed/cruise-50/900/520','Athens roundtrip — Santorini, Mykonos, Dubrovnik and Kotor.',1);
GO

-- ---------- Cruise <-> destination mapping ----------
INSERT INTO dbo.cruise_destinations (cruise_id, destination_id)
SELECT c.id, p.destination_id
FROM dbo.cruises c
JOIN dbo.ports p ON p.id = c.departure_port_id
WHERE p.destination_id IS NOT NULL;
GO

-- add secondary destinations by matching cruise-name patterns
DECLARE @map TABLE (pat NVARCHAR(100) NOT NULL, slug NVARCHAR(140) NOT NULL);
INSERT INTO @map (pat, slug) VALUES
('%Bahamas%','bahamas'),
('%Caribbean%','caribbean'),
('%Bermuda%','caribbean'),
('%Alaska%','alaska'),
('%Mediterranean%','western-mediterranean'),
('%Italy, France & Spain%','western-mediterranean'),
('%Canary%','northern-europe'),
('%Greek%','eastern-mediterranean'),
('%Adriatic%','eastern-mediterranean'),
('%Mexican Riviera%','mexican-riviera'),
('%UAE%','middle-east'),
('%Arabian%','middle-east'),
('%Transatlantic%','transatlantic'),
('%Northern Europe%','northern-europe'),
('%Fjords%','northern-europe'),
('%Hawaii%','south-pacific-hawaii');

INSERT INTO dbo.cruise_destinations (cruise_id, destination_id)
SELECT DISTINCT c.id, d.id
FROM dbo.cruises c
JOIN @map m ON c.name LIKE m.pat
JOIN dbo.destinations d ON d.slug = m.slug
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.cruise_destinations cd
    WHERE cd.cruise_id = c.id AND cd.destination_id = d.id
);
GO

-- ---------- Itinerary days (generated) ----------
-- Day 1 = embark at departure port, alternating ports/sea days, final day = disembark.
DECLARE @c INT, @n INT, @dep INT, @day INT;
DECLARE cur CURSOR FAST_FORWARD FOR
    SELECT id, nights, departure_port_id FROM dbo.cruises;
OPEN cur;
FETCH NEXT FROM cur INTO @c, @n, @dep;
WHILE @@FETCH_STATUS = 0
BEGIN
    INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
    VALUES (@c, 1, @dep, NULL, '5:00 PM', 'Embark — settle in and sail away.');

    SET @day = 2;
    WHILE @day <= @n
    BEGIN
        IF @day % 2 = 0
        BEGIN
            -- pick a port in this cruise's destination region(s); fall back to any port
            DECLARE @pool TABLE (id INT, name NVARCHAR(120));
            INSERT INTO @pool (id, name)
            SELECT p.id, p.name
            FROM dbo.ports p
            WHERE p.id <> @dep
              AND EXISTS (SELECT 1 FROM dbo.cruise_destinations cd
                          WHERE cd.cruise_id = @c AND cd.destination_id = p.destination_id);
            IF NOT EXISTS (SELECT 1 FROM @pool)
                INSERT INTO @pool (id, name)
                SELECT p.id, p.name FROM dbo.ports p WHERE p.id <> @dep;

            INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
            SELECT TOP 1 @c, @day, n.id, '8:00 AM', '6:00 PM',
                   'Port day at ' + n.name
            FROM (SELECT id, name,
                         ROW_NUMBER() OVER (ORDER BY id) AS rn,
                         COUNT(*) OVER () AS cnt
                  FROM @pool) n
            WHERE n.rn = ((@day * 31 + @c) % n.cnt) + 1;
        END
        ELSE
            INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
            VALUES (@c, @day, NULL, NULL, NULL, 'Day at sea — enjoy the ship''s pools, shows and dining.');
        SET @day = @day + 1;
    END

    INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
    VALUES (@c, @n + 1, @dep, '7:00 AM', NULL, 'Disembark — thank you for sailing with us.');

    FETCH NEXT FROM cur INTO @c, @n, @dep;
END
CLOSE cur; DEALLOCATE cur;
GO

-- ---------- Pricing (4 cabin categories per cruise) ----------
DECLARE @c2 INT, @n2 INT;
DECLARE @base DECIMAL(10,2);
DECLARE cur2 CURSOR FAST_FORWARD FOR SELECT id, nights FROM dbo.cruises;
OPEN cur2;
FETCH NEXT FROM cur2 INTO @c2, @n2;
WHILE @@FETCH_STATUS = 0
BEGIN
    -- base per-night rate varies per cruise (deterministic pseudo-random)
    SET @base = 55 + ((@c2 * 37) % 90);   -- $55–$144 per night interior

    INSERT INTO dbo.cruise_pricing (cruise_id, cabin_category, price, original_price, taxes, availability) VALUES
    (@c2, 'interior',  ROUND(@base * @n2, 2),        ROUND(@base * @n2 * 1.35, 2), ROUND(14.5 * @n2, 2), 24),
    (@c2, 'oceanview', ROUND(@base * @n2 * 1.35, 2), ROUND(@base * @n2 * 1.7, 2),  ROUND(14.5 * @n2, 2), 18),
    (@c2, 'balcony',   ROUND(@base * @n2 * 1.9, 2),  ROUND(@base * @n2 * 2.3, 2),  ROUND(15.5 * @n2, 2), 14),
    (@c2, 'suite',     ROUND(@base * @n2 * 3.4, 2),  ROUND(@base * @n2 * 4.1, 2),  ROUND(17.5 * @n2, 2), 8);

    FETCH NEXT FROM cur2 INTO @c2, @n2;
END
CLOSE cur2; DEALLOCATE cur2;
GO

-- ---------- Deals ----------
INSERT INTO dbo.deals (cruise_id, title, badge, description, discount_pct, expires_at) VALUES
(1,'Black Friday Cruise Sale','UP TO 40% OFF','Save big on Caribbean sailings aboard Wonder of the Seas.',40,'2026-11-30'),
(24,'Costa Diadema Med Special','2 FOR 1','Second guest sails free on select Diadema Mediterranean departures.',50,'2026-11-15'),
(14,'MSC World Europa Launch Offer','LAST MINUTE','Last-minute Med fares from Barcelona on the new World Europa.',30,'2026-12-01'),
(11,'Alaska Early Booking Bonus','EARLY BIRD','Book 2027 Alaska now — free balcony upgrade on Norwegian Encore.',NULL,'2027-01-31'),
(18,'Sun Princess Grand Voyage','EXCLUSIVE','Exclusive onboard credit of $200 on Sphere-class sailings.',NULL,'2027-02-28'),
(33,'Arabian Gulf Winter Sun','KIDS SAIL FREE','Kids under 12 sail free on Smeralda''s UAE season.',NULL,'2026-12-31'),
(37,'Disney Wish Family Deal','LIMITED TIME','Reduced deposit and up to 25% off select Bahamas sailings.',25,'2026-11-20'),
(43,'Virgin Voyages Sailor Loot','$300 CREDIT','$300 onboard credit on Scarlet Lady Caribbean sailings.',NULL,'2026-12-15');
GO
