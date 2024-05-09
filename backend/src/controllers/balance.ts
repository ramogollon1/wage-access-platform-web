import { Request, Response } from "express";
import pool from "../db";
import { preRegisteredUsers } from "../utils/constants";
import { WageAccessRequest } from "../models/wage";
import { convertCurrency } from "../utils/currency";

export async function getBalance(req: Request, res: Response) {
  try {
    const userID = req.query.userId as string;

    console.log("User ID:", userID);

    if (!preRegisteredUsers.includes(userID)) {
      console.log("Unauthorized user");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const employeeDataResult = await pool.query(
      "SELECT total_earned_wages, currency FROM employee_wages WHERE employee_id = $1",
      [userID]
    );

    const employeeData = employeeDataResult.rows[0];
    let availableBalance = parseFloat(employeeData.total_earned_wages);

    console.log("Initial available balance:", availableBalance);

    const requestsResult = await pool.query<WageAccessRequest>(
      "SELECT requested_amount, requested_currency FROM wage_access_requests WHERE employee_id = $1",
      [userID]
    );

    console.log("Requests:", requestsResult.rows);

    requestsResult.rows.forEach((request: WageAccessRequest) => {
      const requestAmount = convertCurrency(
        request.requested_amount,
        request.requested_currency,
        employeeData.currency
      );

      console.log("Request amount:", requestAmount);

      availableBalance -= requestAmount;
    });

    if (availableBalance < 0) {
      throw new Error("Negative balance detected");
    }

    console.log("Final available balance:", availableBalance);

    res.json({ availableBalance, currency: employeeData.currency });
  } catch (error) {
    console.error("Error getting balance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
