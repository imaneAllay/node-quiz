const mysql = require('mysql2');

// create pool or connection

exports.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "car"
}).promise()
