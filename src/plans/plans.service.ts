import { Injectable } from '@nestjs/common';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  private plans: Plan[] = [];

  getAll(): Plan[] {
    return this.plans;
  }

  create(planData: CreatePlanDto) {
    this.plans.push({
      id: this.plans.length + 1,
      ...planData,
    });
  }
}
