import express, { type Express, type Request, type Response } from "express";
import {prisma} from "./lib/prisma.ts";
import appsRouter from "./routes/apps.ts";


const app: Express = express();

// Routes
app.use('/apps', appsRouter);

app.get("/", async (req: Request, res: Response) => {
    const apps = await prisma.app.findMany();
    res.send("Test");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
