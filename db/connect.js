const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Int3rn3t!',
        database: 'workbase'
    },
    console.log('connected to workbase')
)

module.exports = db;