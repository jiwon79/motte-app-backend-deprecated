import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @HttpCode(200)
  async getAllPlans(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getPlan(@Param('id') id: number): Promise<Plan> {
    return this.plansService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() planData: CreatePlanDto): Promise<Plan> {
    return this.plansService.create(planData);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() planData: UpdatePlanDto,
    @Param() id: number,
  ): Promise<void> {
    return this.plansService.update(id, planData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() id: number): Promise<void> {
    return this.plansService.delete(id);
  }
}
