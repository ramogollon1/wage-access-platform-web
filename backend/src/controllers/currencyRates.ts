import { Request, Response } from "express";
import pool from "../db";

export async function getCurrencyRates(req: Request, res: Response) {
  try {
    const currencyRatesResult = await pool.query(
      "SELECT * FROM currency_rates"
    );

    const currencyRates = currencyRatesResult.rows;

    res.json(currencyRates);
  } catch (error) {
    console.error("Error getting currency rates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
