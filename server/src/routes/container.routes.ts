import express, { Router } from "express";
import { runPythonContainer } from "../controllers/container.controller";

const route: Router = express.Router();

route.post("/container/py", runPythonContainer);
