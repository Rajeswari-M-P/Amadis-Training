import { Pool } from "pg";
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Read the contents of the schema file
const schemaFilePath = path.resolve(__dirname, "../schema/customer.schema.sql");
const schemaSQL = fs.readFileSync(schemaFilePath, "utf-8");

// Function to create tables defined in the schema file
const createTables = async () => {
  try {
    // Check if the table already exists
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'customer1'
      )
    `);

    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      // Execute the SQL commands to create tables
      await pool.query(schemaSQL);
      console.log(chalk.greenBright("Tables created successfully"));
    } else {
      console.log(chalk.yellow("Table 'Customer' already exists"));
    }
  } catch (error) {
    console.error(chalk.red("Error creating tables:"), error);
  }
};

// Function to connect to the database and create tables
const connectDB = async () => {
  try {
    // Connect to the database
    await pool.connect();
    console.log(chalk.greenBright("Database connected successfully"));

    // Create tables
    await createTables();
  } catch (error) {
    console.error(chalk.red("Error connecting to database:"), error);
  }
};

export default connectDB;
