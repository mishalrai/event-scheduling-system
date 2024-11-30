import { Sequelize} from 'sequelize';
import dotenv from 'dotenv';
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

client.connect(function(err: Error) {
  if (err){
    console.error('❌ Failed to connect to the database:', err);
    throw err;
  }
  console.log('✅ Successfully connected to the database!');
});

export default client;