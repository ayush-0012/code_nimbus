import express, { Router } from "express";
import { runPythonContainer } from "../controllers/container.controller";

const router: Router = express.Router();

router.post("/py", runPythonContainer);

export const containerRoute: Router = router;
