import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  async getAllPlans(): Promise<Plan[]> {
    const planList = await this.plansService.getAll();
    return Object.assign({
      data: planList,
      statusCode: 200,
      statusMsg: '성공',
    });
  }

  @Post()
  async create(@Body() planData: CreatePlanDto): Promise<string[]> {
    await this.plansService.create(planData);
    return Object.assign({
      data: { ...planData },
      statusCode: 201,
      statusMsg: 'create success',
    });
  }
}
