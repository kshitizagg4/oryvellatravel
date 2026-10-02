-- Regenerates itinerary_days so port calls are region-appropriate
-- (was: ports picked from anywhere). Safe to re-run; does not touch
-- cruises, pricing, deals or bookings.
USE CruiseDB;
GO

DELETE FROM dbo.itinerary_days;
GO

DECLARE @c INT, @n INT, @dep INT, @day INT;
DECLARE cur CURSOR FAST_FORWARD FOR
    SELECT id, nights, departure_port_id FROM dbo.cruises;
OPEN cur;
FETCH NEXT FROM cur INTO @c, @n, @dep;
WHILE @@FETCH_STATUS = 0
BEGIN
    INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
    VALUES (@c, 1, @dep, NULL, '5:00 PM', 'Embark — settle in and sail away.');

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

    SET @day = 2;
    WHILE @day <= @n
    BEGIN
        IF @day % 2 = 0
            INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
            SELECT TOP 1 @c, @day, n.id, '8:00 AM', '6:00 PM',
                   'Port day at ' + n.name
            FROM (SELECT id, name,
                         ROW_NUMBER() OVER (ORDER BY id) AS rn,
                         COUNT(*) OVER () AS cnt
                  FROM @pool) n
            WHERE n.rn = ((@day * 31 + @c) % n.cnt) + 1;
        ELSE
            INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
            VALUES (@c, @day, NULL, NULL, NULL, 'Day at sea — enjoy the ship''s pools, shows and dining.');
        SET @day = @day + 1;
    END

    INSERT INTO dbo.itinerary_days (cruise_id, day_number, port_id, arrival_time, departure_time, description)
    VALUES (@c, @n + 1, @dep, '7:00 AM', NULL, 'Disembark — thank you for sailing with us.');

    DELETE FROM @pool;
    FETCH NEXT FROM cur INTO @c, @n, @dep;
END
CLOSE cur; DEALLOCATE cur;
GO
