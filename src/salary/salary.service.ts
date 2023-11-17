// src/salary/salary.service.ts
import { Injectable } from '@nestjs/common';
import { SalaryDto, IncomeRow } from './dto/salary.dto';
import { TaxCalculatorUtil } from '../utils/tax-calculator.util';

@Injectable()
export class SalaryService {
  calculateSalary(salaryData: SalaryDto, creditPoints: number): any {
    const { incomeRows } = salaryData;

    const totalSalary = this.calculateTotalSalary(incomeRows);
    const taxableIncome = this.calculateTaxableIncome(incomeRows);
    const tax = TaxCalculatorUtil.calculateTax(taxableIncome, creditPoints);

    const socialSecurity =
      TaxCalculatorUtil.calculateSocialSecurity(taxableIncome);
    const healthInsurance =
      TaxCalculatorUtil.calculateHealthInsurance(taxableIncome);

    const netIncome = totalSalary - tax - socialSecurity - healthInsurance;

    return {
      toBePaid: netIncome,
      income: incomeRows,
      deductions: [
        { description: 'Tax', amount: tax },
        { description: 'Social Security', amount: socialSecurity },
        { description: 'Health Insurance', amount: healthInsurance },
      ],
      amount: totalSalary,
      taxable: taxableIncome,
    };
  }

  private calculateTotalSalary(incomeRows: IncomeRow[]): number {
    return incomeRows.reduce(
      (total, row) => (row.taxValue ? total : total + row.amount),
      0,
    );
  }

  private calculateTaxableIncome(incomeRows: IncomeRow[]): number {
    return incomeRows.reduce((total, row) => total + row.amount, 0);
  }
}
