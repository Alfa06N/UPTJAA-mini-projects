import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Cambia esto por la tuya
  database: "shopping_cart",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("Conexión a la base de datos establecida");
export default pool;
