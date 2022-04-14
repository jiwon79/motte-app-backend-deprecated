import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  getAllPlans(): Plan[] {
    return this.plansService.getAll();
  }

  @Post()
  create(@Body() planData: CreatePlanDto) {
    return this.plansService.create(planData);
  }
}
