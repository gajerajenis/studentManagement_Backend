const sql = require("mssql");

const config = {
  user: "sa",
  password: "Jenis@123",
  server: "localhost",
  database: "SchoolDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

async function getDB() {
  if (!pool) {
    pool = await sql.connect(config);
    console.log("✅ SQL Connected");
  }
  return pool;
}

module.exports = getDB;
