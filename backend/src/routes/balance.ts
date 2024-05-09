import express from "express";
import { getBalance } from "../controllers/balance";

const router = express.Router();

router.get("/", getBalance);

export default router;
