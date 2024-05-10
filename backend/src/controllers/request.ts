import { Request, Response, NextFunction } from "express";
import pool from "../db";
import { convertCurrency } from "../utils/currency";
import { preRegisteredUsers } from "../utils/constants";
import { WageAccessRequest } from "../models/wage";

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userID = req.body.userID as string;

  if (!preRegisteredUsers.includes(userID)) {
    return res.status(401).json({
      error:
        "Unauthorized: User ID " +
        userID +
        " is not authorized to access this resource",
    });
  }

  next();
}

async function validateBalance(
  userId: string,
  requestedAmount: number,
  requestedCurrency: string
): Promise<number> {
  try {
    let totalPendingAmount = 0;
    const pendingRequestsResult = await pool.query<WageAccessRequest>(
      "SELECT requested_amount, requested_currency FROM wage_access_requests WHERE employee_id = $1",
      [userId]
    );

    pendingRequestsResult.rows.forEach((request: WageAccessRequest) => {
      const requestAmount = convertCurrency(
        request.requested_amount,
        request.requested_currency,
        requestedCurrency
      );
      totalPendingAmount += requestAmount;
    });

    requestedAmount -= totalPendingAmount;

    const balanceQuery = `
      SELECT total_earned_wages::NUMERIC, currency
      FROM employee_wages
      WHERE employee_id = $1;
    `;
    const balanceResult = await pool.query(balanceQuery, [userId]);
    const { total_earned_wages: availableBalance, currency: employeeCurrency } =
      balanceResult.rows[0];

    let requiredAmount = requestedAmount;

    if (requestedCurrency !== employeeCurrency) {
      requiredAmount = convertCurrency(
        Math.abs(requestedAmount),
        requestedCurrency,
        employeeCurrency
      );
    }

    if (requiredAmount > parseFloat(availableBalance)) {
      throw new Error("Insufficient balance in " + employeeCurrency);
    }

    const updatedBalance = parseFloat(availableBalance) - requiredAmount;

    return updatedBalance;
  } catch (error) {
    console.error("Error validating balance:", error);
    throw error;
  }
}

export async function submitRequest(req: Request, res: Response) {
  let client;
  try {
    const { userID, requestedAmount, requestedCurrency } = req.body || {};

    await validateUser(req, res, () => {});

    const updatedBalance = await validateBalance(
      userID,
      requestedAmount,
      requestedCurrency
    );

    client = await pool.connect();

    if (updatedBalance < 0) {
      console.error("Insufficient balance in " + requestedCurrency);
      return res.status(400).json({
        error: "Insufficient balance in " + requestedCurrency,
      });
    }

    await client.query("BEGIN");

    const updateBalanceQuery = `
      UPDATE employee_wages
      SET total_earned_wages = total_earned_wages - $1
      WHERE employee_id = $2;
    `;
    await client.query(updateBalanceQuery, [requestedAmount, userID]);

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Request submitted successfully",
      availableBalance: updatedBalance,
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error processing request:", error);
    res.status(400).json({ error: "Bad request" });
  } finally {
    if (client) {
      client.release();
    }
  }
}
