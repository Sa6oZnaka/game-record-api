CREATE DATABASE tttgamedata;
USE tttgamedata;

CREATE TABLE Games(
    id int NOT NULL,
    winnerId int NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME NULL,

    PRIMARY KEY (id)
);

CREATE TABLE Moves(
    id int auto_increment NOT NULL,
    gameId int NOT NULL,
    playerId int NOT NULL,
    position int NOT NULL,
    date DATETIME NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (gameId) REFERENCES Games(id),
    CONSTRAINT UC_Person UNIQUE (position, gameId),
    CHECK (position > 0 AND position <= 9)
);