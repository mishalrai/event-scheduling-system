import dotenv from "dotenv";
const { Client } = require("pg");

dotenv.config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

client.connect(function (err: Error) {
  if (err) {
    console.error("❌ Failed to connect to the database:", err);
    throw err;
  }
  console.log("✅ Successfully connected to the database!");
});

export default client;
