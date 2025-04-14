import express, { Router } from "express";
import {
  executeCode,
  runPythonContainer,
} from "../controllers/container.controller";

const router: Router = express.Router();

router.post("/python", runPythonContainer);

router.post("/exec/python", executeCode);

export const containerRoute: Router = router;
