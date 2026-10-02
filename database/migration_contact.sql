-- Adds contact_messages to an existing CruiseDB (run once if the DB
-- was created before this table existed).
USE CruiseDB;
GO

IF OBJECT_ID('dbo.contact_messages', 'U') IS NULL
CREATE TABLE dbo.contact_messages (
    id         INT IDENTITY(1,1) PRIMARY KEY,
    name       NVARCHAR(120) NOT NULL,
    email      NVARCHAR(160) NOT NULL,
    subject    NVARCHAR(200) NULL,
    message    NVARCHAR(2000) NOT NULL,
    status     NVARCHAR(20) NOT NULL DEFAULT 'NEW',
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
