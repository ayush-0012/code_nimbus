import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("server is running, home page");
});

app.listen(4000, () => {
  console.log("server running on port", PORT);
});
