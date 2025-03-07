import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("server is running, home page");
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
