import "dotenv/config";

import pool from "../lib/db.ts";

await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS apps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        description1 TEXT NOT NULL,
        description2 TEXT NOT NULL,
        image1 VARCHAR(255) NOT NULL,
        image2 VARCHAR(255) NOT NULL,
        color VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
`);

console.log("Tables created");
process.exit(0);
