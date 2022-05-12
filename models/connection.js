const mysql = require('mysql2');
//sql account connection login info
const db = mysql.createConnection({
    // Using dotenv for security and hiding passwords
    host: 'localhost',    
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
},
    console.log('Connected to the employee tracker database.')

);
//throw error if connection is refused
connection.connect(err => {
    if(err) throw err;
})

module.exports = connection;
//END