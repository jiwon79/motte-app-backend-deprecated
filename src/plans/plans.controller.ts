import { Controller, Get } from '@nestjs/common';

@Controller('plans')
export class PlansController {
  @Get()
  getAllPlans() {
    return 'get all plans';
  }
}
