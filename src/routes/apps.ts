import { Router, type Request, type Response } from 'express';
import pool from '../lib/db.ts';
import { authMiddleware } from '../middleware/auth.ts';

const appsRouter = Router();

// GET all apps - public
appsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM apps ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch apps' });
    }
});

export default appsRouter;