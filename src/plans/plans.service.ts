import { Injectable } from '@nestjs/common';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansRepository } from 'src/plans/plans.repository';

@Injectable()
export class PlansService {
  constructor(private readonly plansRepository: PlansRepository) {}

  async findAll(): Promise<Plan[]> {
    return this.plansRepository.findAll();
  }

  async findOne(id: number): Promise<Plan> {
    return this.plansRepository.findById(id);
  }

  async create(planData: CreatePlanDto): Promise<Plan> {
    return this.plansRepository.create(planData);
  }

  async update(id: number, planData: UpdatePlanDto): Promise<void> {
    return this.plansRepository.update(id, planData);
  }

  async remove(id: number): Promise<void> {
    return this.plansRepository.delete(id);
  }
}
