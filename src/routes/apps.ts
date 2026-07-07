import express, { type Express, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.ts";

const appsRouter: Express = express();

appsRouter.get("/", async (req: Request, res: Response) => {
    const apps = await prisma.app.findMany();

    res.json(apps);
});

export default appsRouter;
