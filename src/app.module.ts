import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(
      process.env.NODE_ENV
        ? {
            url: process.env.DATABASE_URL,
            type: 'postgres',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true,
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            type: 'sqlite',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
          },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
