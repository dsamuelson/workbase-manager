const mysql = require('mysql2');
//Set up my local connection to mySQL
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: ' ',
        database: 'workbase'
    },
    console.log('connected to workbase')
)

module.exports = db;