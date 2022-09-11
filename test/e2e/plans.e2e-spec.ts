import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

import { typeOrmAsyncConfig } from '../../ormconfig';
import { PlansModule } from 'src/plans/plans.module';
import { Plan } from 'src/plans/plan.entity';

describe('Plans', () => {
  let app: INestApplication;
  let repository: Repository<Plan>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), PlansModule],
    }).compile();

    repository = moduleRef.get('PlanRepository');

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await repository.delete({});
  });

  afterAll(async () => {
    await repository.delete({});
    await app.close();
  });

  it('/plans (GET)', async () => {
    const plan = repository.create({
      date: '2022-02-02',
      title: 'title',
      tag: '[]',
    });

    await repository.save(plan);
    const response = await request(app.getHttpServer()).get('/plans');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].date).toBe('2022-02-02');
    expect(response.body[0].title).toBe('title');
    expect(response.body[0].tag).toBe('[]');
  });
});
