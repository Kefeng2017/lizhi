const mysql = require('mysql')
const co = require('co-mysql')

let connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "lizhi",
    timezone: "08:00"
})
module.exports = co(connection)