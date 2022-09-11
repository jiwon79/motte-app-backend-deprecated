import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

import { typeOrmAsyncConfig } from '../../ormconfig';
import { UsersModule } from 'src/users/users.module';

describe('Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.status).toBe(200);
  });
});
