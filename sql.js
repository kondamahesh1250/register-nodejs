var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database:"practice"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;