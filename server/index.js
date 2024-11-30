import express from "express";

import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { client } from "./src/db.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.put("/visit", (req, res) => {
  const { cookie } = req.body;
  res.json({ success: true });
});

app.listen(5050, () => console.log("🚀 Server is listening on port 5050..."));
