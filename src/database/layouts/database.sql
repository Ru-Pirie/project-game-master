CREATE TABLE IF NOT EXISTS 'MEMBERS' (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    uuid VARCHAR(255),
    minecraftName VARCHAR(255),
    linked TINYINT(1) NOT NULL,
    dateLinked TIMESTAMP,
    dateJoined TIMESTAMP,
    lastUpdated TIMESTAMP
);