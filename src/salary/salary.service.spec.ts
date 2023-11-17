import { Test, TestingModule } from '@nestjs/testing';
import { SalaryService } from './salary.service';

describe('SalaryService', () => {
  let service: SalaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryService],
    }).compile();

    service = module.get<SalaryService>(SalaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate salary with tax', () => {
    const salaryData = {
      incomeRows: [
        { description: 'Base Salary', amount: 12000.0, taxValue: false },
        { description: 'Overtime Salary', amount: 3000.0, taxValue: false },
        { description: 'Rides', amount: 255.0, taxValue: false },
        { description: 'Meals', amount: 800.0, taxValue: true },
      ],
    };

    const creditPoints = 4.25;

    const result = service.calculateSalary(salaryData, creditPoints);
    console.log(result);

    expect(result.toBePaid).toBeGreaterThan(0);
    expect(result.amount).toBeGreaterThan(0);
  });
});
