import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';

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
}
