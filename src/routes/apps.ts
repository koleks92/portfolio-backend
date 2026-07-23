import { Router, type Request, type Response } from "express";
import pool from "../lib/db.ts";
import { authMiddleware } from "../middleware/auth.ts";

const appsRouter = Router();

// GET all apps - public
appsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM apps ORDER BY created_at ASC",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch apps" });
  }
});

// POST add app
appsRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { title, url, description1, description2, image1, image2 } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO apps (title, url, description1, description2, image1, image2)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
      [title, url, description1, description2, image1, image2],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create app error:", error);
    res
      .status(500)
      .json({ error: "Failed to create app", details: String(error) });
  }
});

export default appsRouter;
