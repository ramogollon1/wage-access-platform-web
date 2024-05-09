import express from "express";
import { getCurrencyRates } from "../controllers/currencyRates";

const router = express.Router();

router.get("/", getCurrencyRates);

export default router;
