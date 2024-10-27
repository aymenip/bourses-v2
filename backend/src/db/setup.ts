import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const initializeDatabase = async () => {
    const connection = await mysql.createConnection({
        host: process.env.HOST, // replace with your host
        user: process.env.USER, // replace with your username
        password: process.env.PASSWORD, // replace with your password
        database: process.env.DATABASE, // replace with your database name
    });
    return drizzle(connection);
};

// Immediately initialize the database
const db = initializeDatabase();

export { db };