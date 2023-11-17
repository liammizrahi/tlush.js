import { HttpException, HttpStatus } from '@nestjs/common';

export class SalaryException extends HttpException {
  constructor(message: string) {
    super({ message, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
  }
}
