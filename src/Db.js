const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tttgamedata'
});

module.exports = class Db{

    constructor(){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to db!");
        });
    }

    AddMove = (gameId, playerId, position, date) => {
        var sqlDate = date.toISOString().slice(0, 19).replace('T', ' ');
        let query = 'INSERT INTO Moves (gameId, playerId, position, date) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject)=>{
            connection.query(query, [gameId, playerId, position, sqlDate], (error, results)=>{
                if(error)
                    reject();

                return resolve(results);
            });
        });
    }

    GetMoves = (gameId) => {
        console.log("Called!");

        let query = 'SELECT * FROM Moves WHERE gameId = ? ORDER BY date;';

        return new Promise((resolve, reject)=>{
            connection.query(query, [gameId], (error, results)=>{
                if(error)
                    reject();

                return resolve(results);
            });
        });
    }
}