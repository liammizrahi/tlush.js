import { Body, Controller, Post } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryDto } from './dto/salary.dto';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('calculate')
  calculateSalary(@Body() salaryData: SalaryDto): any {
    return this.salaryService.calculateSalary(salaryData, 2.25);
  }
}
