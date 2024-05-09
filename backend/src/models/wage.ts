interface EmployeeWageData {
  employee_id: string;
  total_earned_wages: number;
  currency: string;
}

interface WageAccessRequest {
  request_id: string;
  employee_id: string;
  requested_amount: number;
  requested_currency: string;
}

export { EmployeeWageData, WageAccessRequest };
