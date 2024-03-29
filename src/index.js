const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const jwtSecret = "ttgame";

const Db = require("./Db");
const db = new Db();
const port = 3000;

const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/newMove', async (req, res) => 
{
    const token = req.query.token;
    console.log(token);

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        
        console.log(decoded);

        var jsDate = new Date(decoded.date * 1000);

        await db.AddMove(
            decoded.gameId, 
            decoded.playerId, 
            decoded.position, 
            jsDate
        );
    } catch (err) {
        return res.status(400).send("Invalid token.");
    }
    
    return res.status(200).send("OK.");
});

app.post('/newGame', async (req, res) => 
{
    const token = req.query.token;
    console.log(token);

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        
        console.log(decoded);

        var jsDate = new Date(decoded.date * 1000);

        await db.AddGame(
            decoded.gameId, 
            jsDate
        );
    } catch (err) {
        return res.status(400).send("Invalid token.");
    }
    
    return res.status(200).send("OK.");
});

app.post('/finishGame', async (req, res) => 
{
    const token = req.query.token;
    console.log(token);

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        
        console.log(decoded);

        var jsDate = new Date(decoded.date * 1000);

        await db.FinishGame(
            decoded.gameId, 
            decoded.winnerId,
            jsDate
        );
    } catch (err) {
        return res.status(400).send("Invalid token.");
    }
    
    return res.status(200).send("OK.");
});

app.get('/getGame', async (req, res) => 
{
    const gameId = req.query.gameId;

    data = await db.GetGame(
        gameId
    );
    
    if(!data)
        return res.status(404).send("NOT FOUND");

    return res.status(200).send(data);
});

app.get('/getMoves', async (req, res) => 
{
    const gameId = req.query.gameId;

    data = await db.GetMoves(
        gameId
    );
    
    if(!data)
        return res.status(404).send("NOT FOUND");

    return res.status(200).send(data);
});

app.listen(port, function() {
    console.log(`App listening on port ${port}!`)
});