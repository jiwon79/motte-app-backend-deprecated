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

  async findAll(): Promise<Plan[]> {
    return await this.planRepository.find();
  }

  async findOne(id: number): Promise<Plan> {
    return await this.planRepository.findOne(id);
  }

  async create(planData: CreatePlanDto): Promise<Plan> {
    // const newPlan = this.planRepository.create(planData);
    return await this.planRepository.save(planData);
  }

  async update(id: number, planData: UpdatePlanDto): Promise<void> {
    await this.planRepository.update(id, planData);
  }

  async remove(id: number) {
    await this.planRepository.softDelete(id);
  }
}
