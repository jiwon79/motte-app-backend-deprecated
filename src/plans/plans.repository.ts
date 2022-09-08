import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './plan.entity';

@Injectable()
export class PlansRepository {
  constructor(
    @InjectRepository(Plan) private readonly repository: Repository<Plan>,
  ) {}

  async findAll(): Promise<Plan[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Plan> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.repository.create(createPlanDto);
    await this.repository.save(plan);

    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<void> {
    await this.repository.update(id, updatePlanDto);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
