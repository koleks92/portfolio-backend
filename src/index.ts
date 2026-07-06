import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import { neon } from "@neondatabase/serverless";

const app = express();
const PORT = process.env.PORT || 4242;

const sql = neon(process.env.DATABASE_URL!);

app.get('/', async (req: Request, res: Response) => {
  try {
    const [result] = await sql`SELECT version()`;
    const version = result?.version || 'No version found';
    res.json({ version });
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Failed to connect to the database.' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});