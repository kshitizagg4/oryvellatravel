-- =============================================================
-- CruiseDirect-style database schema (Microsoft SQL Server)
-- Run in SSMS / Azure Data Studio:  sqlcmd -S <server> -i schema.sql
-- Adjust the database name below if needed.
-- =============================================================

IF DB_ID('CruiseDB') IS NULL
    CREATE DATABASE CruiseDB;
GO

USE CruiseDB;
GO

IF OBJECT_ID('dbo.bookings', 'U') IS NOT NULL DROP TABLE dbo.bookings;
IF OBJECT_ID('dbo.contact_messages', 'U') IS NOT NULL DROP TABLE dbo.contact_messages;
IF OBJECT_ID('dbo.deals', 'U') IS NOT NULL DROP TABLE dbo.deals;
IF OBJECT_ID('dbo.cruise_pricing', 'U') IS NOT NULL DROP TABLE dbo.cruise_pricing;
IF OBJECT_ID('dbo.itinerary_days', 'U') IS NOT NULL DROP TABLE dbo.itinerary_days;
IF OBJECT_ID('dbo.cruise_destinations', 'U') IS NOT NULL DROP TABLE dbo.cruise_destinations;
IF OBJECT_ID('dbo.cruises', 'U') IS NOT NULL DROP TABLE dbo.cruises;
IF OBJECT_ID('dbo.ports', 'U') IS NOT NULL DROP TABLE dbo.ports;
IF OBJECT_ID('dbo.ships', 'U') IS NOT NULL DROP TABLE dbo.ships;
IF OBJECT_ID('dbo.destinations', 'U') IS NOT NULL DROP TABLE dbo.destinations;
IF OBJECT_ID('dbo.cruise_lines', 'U') IS NOT NULL DROP TABLE dbo.cruise_lines;
GO

CREATE TABLE dbo.cruise_lines (
    id          INT IDENTITY(1,1) PRIMARY KEY,
    name        NVARCHAR(120) NOT NULL,
    slug        NVARCHAR(140) NOT NULL UNIQUE,
    logo_url    NVARCHAR(400) NULL,
    tagline     NVARCHAR(200) NULL,
    description NVARCHAR(MAX) NULL,
    rating      DECIMAL(2,1) NOT NULL DEFAULT 4.0,
    ship_count  INT NOT NULL DEFAULT 0
);

CREATE TABLE dbo.ships (
    id                 INT IDENTITY(1,1) PRIMARY KEY,
    cruise_line_id     INT NOT NULL REFERENCES dbo.cruise_lines(id),
    name               NVARCHAR(120) NOT NULL,
    slug               NVARCHAR(140) NOT NULL UNIQUE,
    image_url          NVARCHAR(400) NULL,
    passenger_capacity INT NULL,
    crew               INT NULL,
    year_built         INT NULL,
    year_refurbished   INT NULL,
    tonnage            INT NULL,
    length_m           DECIMAL(6,1) NULL,
    speed_knots        DECIMAL(4,1) NULL,
    description        NVARCHAR(MAX) NULL,
    rating             DECIMAL(2,1) NOT NULL DEFAULT 4.0
);

CREATE TABLE dbo.destinations (
    id          INT IDENTITY(1,1) PRIMARY KEY,
    name        NVARCHAR(120) NOT NULL,
    slug        NVARCHAR(140) NOT NULL UNIQUE,
    region      NVARCHAR(80) NULL,
    image_url   NVARCHAR(400) NULL,
    description NVARCHAR(MAX) NULL
);

CREATE TABLE dbo.ports (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    name           NVARCHAR(120) NOT NULL,
    city           NVARCHAR(120) NULL,
    country        NVARCHAR(120) NULL,
    destination_id INT NULL REFERENCES dbo.destinations(id),
    CONSTRAINT UQ_ports_name UNIQUE (name)
);

CREATE TABLE dbo.cruises (
    id                INT IDENTITY(1,1) PRIMARY KEY,
    ship_id           INT NOT NULL REFERENCES dbo.ships(id),
    name              NVARCHAR(200) NOT NULL,
    slug              NVARCHAR(220) NOT NULL UNIQUE,
    departure_port_id INT NOT NULL REFERENCES dbo.ports(id),
    return_port_id    INT NOT NULL REFERENCES dbo.ports(id),
    departure_date    DATE NOT NULL,
    return_date       DATE NOT NULL,
    nights            INT NOT NULL,
    image_url         NVARCHAR(400) NULL,
    description       NVARCHAR(MAX) NULL,
    is_featured       BIT NOT NULL DEFAULT 0,
    created_at        DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.cruise_destinations (
    cruise_id      INT NOT NULL REFERENCES dbo.cruises(id) ON DELETE CASCADE,
    destination_id INT NOT NULL REFERENCES dbo.destinations(id),
    CONSTRAINT PK_cruise_dest PRIMARY KEY (cruise_id, destination_id)
);

CREATE TABLE dbo.itinerary_days (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    cruise_id      INT NOT NULL REFERENCES dbo.cruises(id) ON DELETE CASCADE,
    day_number     INT NOT NULL,
    port_id        INT NULL REFERENCES dbo.ports(id),
    arrival_time   NVARCHAR(20) NULL,
    departure_time NVARCHAR(20) NULL,
    description    NVARCHAR(400) NULL,
    CONSTRAINT UQ_itin UNIQUE (cruise_id, day_number)
);

CREATE TABLE dbo.cruise_pricing (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    cruise_id       INT NOT NULL REFERENCES dbo.cruises(id) ON DELETE CASCADE,
    cabin_category  NVARCHAR(20) NOT NULL,   -- interior | oceanview | balcony | suite
    price           DECIMAL(10,2) NOT NULL,  -- per person
    original_price  DECIMAL(10,2) NULL,      -- before discount
    taxes           DECIMAL(10,2) NOT NULL DEFAULT 0,
    availability    INT NOT NULL DEFAULT 20,
    CONSTRAINT UQ_pricing UNIQUE (cruise_id, cabin_category)
);

CREATE TABLE dbo.deals (
    id           INT IDENTITY(1,1) PRIMARY KEY,
    cruise_id    INT NULL REFERENCES dbo.cruises(id) ON DELETE CASCADE,
    title        NVARCHAR(160) NOT NULL,
    badge        NVARCHAR(60) NULL,          -- e.g. "LAST MINUTE", "2 FOR 1"
    description  NVARCHAR(500) NULL,
    discount_pct INT NULL,
    expires_at   DATE NULL
);

CREATE TABLE dbo.contact_messages (
    id         INT IDENTITY(1,1) PRIMARY KEY,
    name       NVARCHAR(120) NOT NULL,
    email      NVARCHAR(160) NOT NULL,
    subject    NVARCHAR(200) NULL,
    message    NVARCHAR(2000) NOT NULL,
    status     NVARCHAR(20) NOT NULL DEFAULT 'NEW',
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.bookings (
    id             INT IDENTITY(1,1) PRIMARY KEY,
    booking_ref    NVARCHAR(20) NOT NULL UNIQUE,
    cruise_id      INT NOT NULL REFERENCES dbo.cruises(id),
    cabin_category NVARCHAR(20) NOT NULL,
    num_guests     INT NOT NULL,
    first_name     NVARCHAR(80) NOT NULL,
    last_name      NVARCHAR(80) NOT NULL,
    email          NVARCHAR(160) NOT NULL,
    phone          NVARCHAR(40) NULL,
    special_requests NVARCHAR(1000) NULL,
    total_price    DECIMAL(12,2) NOT NULL,
    status         NVARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
    created_at     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE INDEX IX_cruises_departure ON dbo.cruises (departure_date);
CREATE INDEX IX_cruises_ship ON dbo.cruises (ship_id);
CREATE INDEX IX_cruises_dep_port ON dbo.cruises (departure_port_id);
CREATE INDEX IX_pricing_cruise ON dbo.cruise_pricing (cruise_id);
CREATE INDEX IX_itin_cruise ON dbo.itinerary_days (cruise_id);
GO
