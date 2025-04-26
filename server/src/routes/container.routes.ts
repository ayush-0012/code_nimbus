import express, { Router } from "express";
import {
  createContainer,
  executeCode,
} from "../controllers/container.controller";

const router: Router = express.Router();

router.post("/create", createContainer);

router.post("/exec", executeCode);

export const containerRoute: Router = router;
