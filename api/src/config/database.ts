import dotenv from "dotenv";
const { Sequelize } = require("sequelize");

dotenv.config();

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Successfully connected to the database!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
})();

export default sequelize;
