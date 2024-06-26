import express from "express";
import { authenticateUser } from "../controllers/auth";

const router = express.Router();

router.post("/", authenticateUser);

export default router;
