const mysql = require("mysql");

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'daisyTest'
});

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

module.exports = database; 