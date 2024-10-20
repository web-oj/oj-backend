import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// export const test = async () => {
//   try {
//     const [row, fields] = await pool.query("SHOW TABLES");
//     console.log(row);
//     console.log(fields);
//   } catch (err) {
//     console.log(err);
//   }
// };

