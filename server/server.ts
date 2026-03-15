import express from "express";
import type { Request, Response } from "express";
import 'dotenv/config';
import cors from "cors";

const app = express();

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
}
app.use(cors());


app.get("/", (req: Request, res: Response) => {
  res.send("Server running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});