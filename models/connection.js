const mysql = require('mysql2');
//sql account connection login info
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'divine-pop-grid-dory',
    database: 'employees'
});
//throw error if connection is refused
connection.connect(err => {
    if(err) throw err;
})

module.exports = connection;
//END