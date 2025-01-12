import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
});


export const initDatabase = async () => {
  const client = await pool.connect();
  try {
    // Check if the table exists
    const result = await client.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'todos'
      );
    `);

    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      console.log('Table does not exist. Creating...');
      // Create the table if it does not exist
      await client.query(`
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            value VARCHAR(255) NOT NULL,
            checked BOOLEAN
        );
      `);
      console.log('Table created.');
    } else {
      console.log('Table already exists. Skipping initialization.');
    }
  } catch (error) {
    console.error('Error initializing the database:', error);
  } finally {
    client.release();
  }
};

export default pool;
