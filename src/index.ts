import express, { type Express, type Request, type Response } from "express";
import appsRouter from "./routes/apps.ts";
import authRouter from "./routes/auth.ts";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/apps", appsRouter);
app.use("/auth", authRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Test");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
