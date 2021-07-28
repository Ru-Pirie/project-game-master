CREATE TABLE IF NOT EXISTS 'MEMBERS' (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    uuid VARCHAR(255),
    minecraftName VARCHAR(255),
    linked TINYINT(1) NOT NULL,
    dateLinked TIMESTAMP,
    dateJoined TIMESTAMP,
    lastUpdated TIMESTAMP
);

CREATE TABLE IF NOT EXISTS 'QUEUE' (
    id VARCHAR(255) NOT NULL,
    uuid VARCHAR(255) NOT NULL,
    game VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS 'MISC' (
    key VARCHAR(255) NOT NULL PRIMARY KEY,
    value VARCHAR(255)
);