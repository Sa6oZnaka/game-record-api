CREATE DATABASE tttgamedata;
USE tttgamedata;

CREATE TABLE Moves(
    id int primary key auto_increment NOT NULL,
    gameId int NOT NULL,
    playerId int NOT NULL,
    position int NOT NULL,
    date DATETIME NOT NULL
);