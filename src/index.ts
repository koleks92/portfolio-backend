import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json()); // lets Express read JSON from requests

app.get("/", (req, res) => {
    res.json({ message: "Portfolio API is running" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});