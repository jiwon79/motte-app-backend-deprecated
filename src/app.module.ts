import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(
      process.env.NODE_ENV
        ? {
            url: process.env.DATABASE_URL,
            type: 'postgres',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
            autoLoadEntities: true,
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            type: 'sqlite',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
          },
    ),
    PlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
