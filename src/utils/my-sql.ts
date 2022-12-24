const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: 3306,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD,
  dateStrings: true,
});

export default pool;
