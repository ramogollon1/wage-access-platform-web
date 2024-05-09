import { EmployeeWageData, WageAccessRequest } from "./models/wage";

export const employeeWageData: EmployeeWageData[] = [
  { employee_id: "E01", total_earned_wages: 1200, currency: "USD" },
  { employee_id: "E02", total_earned_wages: 9500, currency: "ARS" },
  { employee_id: "E03", total_earned_wages: 800, currency: "USD" },
];

export const wageAccessRequests: WageAccessRequest[] = [
  {
    request_id: "R01",
    employee_id: "E01",
    requested_amount: 200,
    requested_currency: "USD",
  },
  {
    request_id: "R02",
    employee_id: "E02",
    requested_amount: 1000,
    requested_currency: "ARS",
  },
  {
    request_id: "R03",
    employee_id: "E03",
    requested_amount: 100,
    requested_currency: "USD",
  },
];
