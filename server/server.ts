import express from "express";
import type { Request, Response } from "express";
import 'dotenv/config';
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/userroutes.js";
import projectRouter from "./routes/projectRoutes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});

const app = express();

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
}
app.use(cors(corsOptions));
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook)
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json({limit: '50mb'}));

app.get("/", (req: Request, res: Response) => {
  res.send("Server running!");
});

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});