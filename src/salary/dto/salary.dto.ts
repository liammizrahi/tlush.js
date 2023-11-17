export class SalaryDto {
  incomeRows: IncomeRow[];
}

export interface IncomeRow {
  description: string;
  amount: number;
  taxValue: boolean;
}
