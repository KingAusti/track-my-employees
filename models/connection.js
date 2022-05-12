const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'divine-pop-grid-dory',
    database: 'employees'
});

connection.connect(err => {
    if(err) throw err;
})

module.exports = connection;
