import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { PlansService } from './plans.service';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

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

  @Get('/:id')
  async getPlan(@Param('id') id: number) {
    const plan = await this.plansService.getOne(id);
    return {
      data: plan,
      statusCode: 200,
      statusMsg: 'get one success',
    };
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
