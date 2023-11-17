export class TaxCalculatorUtil {
  private static readonly TAX_RATES = [
    { min: 0, max: 6790, rate: 0.1 },
    { min: 6791, max: 9730, rate: 0.14 },
    { min: 9731, max: 15620, rate: 0.2 },
    { min: 15621, max: 21710, rate: 0.31 },
    { min: 21711, max: 45180, rate: 0.35 },
    { min: 45181, max: Infinity, rate: 0.47 },
  ];

  private static readonly CREDIT_POINTS_VALUE = 235;

  private static readonly REDUCED_RATE_LIMIT = 7122;
  private static readonly FULL_RATE_LIMIT = 47465;

  static calculateTax(totalIncome: number, creditPoints: number): number {
    let tax = 0;

    for (const rate of this.TAX_RATES) {
      if (totalIncome <= rate.max) {
        tax += (totalIncome - rate.min) * rate.rate;
        break;
      } else {
        tax += (rate.max - rate.min) * rate.rate;
      }
    }

    const creditPointsDeduction = creditPoints * this.getCreditPointsValue();
    tax = Math.max(tax - creditPointsDeduction, 0); // Deduct credit points

    return tax;
  }

  static calculateSocialSecurity(totalIncome: number): number {
    const SOCIAL_SECURITY_REDUCED_RATE = 0.004;
    const SOCIAL_SECURITY_FULL_RATE = 0.07;

    let socialSecurity = 0;

    if (totalIncome <= this.REDUCED_RATE_LIMIT) {
      socialSecurity += totalIncome * SOCIAL_SECURITY_REDUCED_RATE;
    } else {
      socialSecurity += this.REDUCED_RATE_LIMIT * SOCIAL_SECURITY_REDUCED_RATE;

      if (
        totalIncome > this.REDUCED_RATE_LIMIT &&
        totalIncome <= this.FULL_RATE_LIMIT
      ) {
        socialSecurity +=
          (totalIncome - this.REDUCED_RATE_LIMIT) * SOCIAL_SECURITY_FULL_RATE;
      } else {
        socialSecurity +=
          (this.FULL_RATE_LIMIT - this.REDUCED_RATE_LIMIT) *
          SOCIAL_SECURITY_FULL_RATE;
      }
    }

    return Math.round(socialSecurity);
  }

  static calculateHealthInsurance(totalIncome: number): number {
    const HEALTH_INSURANCE_REDUCED_RATE = 0.031;
    const HEALTH_INSURANCE_FULL_RATE = 0.05;

    let healthInsurance = 0;

    if (totalIncome <= this.REDUCED_RATE_LIMIT) {
      healthInsurance += totalIncome * HEALTH_INSURANCE_REDUCED_RATE;
    } else {
      healthInsurance +=
        this.REDUCED_RATE_LIMIT * HEALTH_INSURANCE_REDUCED_RATE;

      if (
        totalIncome > this.REDUCED_RATE_LIMIT &&
        totalIncome <= this.FULL_RATE_LIMIT
      ) {
        healthInsurance +=
          (totalIncome - this.REDUCED_RATE_LIMIT) * HEALTH_INSURANCE_FULL_RATE;
      } else {
        healthInsurance +=
          (this.FULL_RATE_LIMIT - this.REDUCED_RATE_LIMIT) *
          HEALTH_INSURANCE_FULL_RATE;
      }
    }

    return Math.round(healthInsurance);
  }

  private static getCreditPointsValue(): number {
    // This method could fetch the credit points value dynamically, if needed
    return this.CREDIT_POINTS_VALUE;
  }
}
