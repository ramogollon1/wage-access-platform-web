import fs from "fs";
import path from "path";
import pool from "../db";

interface UserData {
  employeeID: string;
  totalEarnedWages: number;
  currency: string;
}

export async function seedDatabaseWithUsers() {
  try {
    const userDataPath = path.resolve(__dirname, "../../user_data.json");
    const userData = fs.readFileSync(userDataPath, "utf-8");
    const users: {
      employeeWageData: UserData[];
      currencyRates: { [currencyPair: string]: number };
      wageAccessRequests: any[];
    } = JSON.parse(userData);

    const employeeWageInserts = users.employeeWageData
      .map((user: UserData) => {
        return `('${user.employeeID}', ${user.totalEarnedWages}, '${user.currency}')`;
      })
      .join(", ");

    const insertEmployeeWagesQuery = `
      INSERT INTO employee_wages (employee_id, total_earned_wages, currency)
      VALUES ${employeeWageInserts};
    `;

    await pool.query(insertEmployeeWagesQuery);

    const currencyRateInserts = Object.entries(users.currencyRates)
      .map(([currencyPair, exchangeRate]) => {
        return `('${currencyPair}', ${exchangeRate})`;
      })
      .join(", ");

    const insertCurrencyRatesQuery = `
      INSERT INTO currency_rates (currency_pair, exchange_rate)
      VALUES ${currencyRateInserts};
    `;

    await pool.query(insertCurrencyRatesQuery);

    const wageAccessRequestInserts = users.wageAccessRequests
      .map((request) => {
        return `('${request.requestID}', '${request.employeeID}', ${request.requestedAmount}, '${request.requestedCurrency}')`;
      })
      .join(", ");

    const insertWageAccessRequestsQuery = `
      INSERT INTO wage_access_requests (request_id, employee_id, requested_amount, requested_currency)
      VALUES ${wageAccessRequestInserts};
    `;

    await pool.query(insertWageAccessRequestsQuery);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
