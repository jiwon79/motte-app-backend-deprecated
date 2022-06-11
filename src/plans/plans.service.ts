import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {
    this.planRepository = planRepository;
  }

  getAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }

  getOne(id: number): Promise<Plan> {
    return this.planRepository.findOne(id);
  }

  async create(planData: CreatePlanDto): Promise<void> {
    const newPlan = this.planRepository.create(planData);
    await this.planRepository.save(newPlan);
  }
}
