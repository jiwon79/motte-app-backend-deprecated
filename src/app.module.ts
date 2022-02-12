import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansModule } from './plans/plans.module';
import typeormConfig from '../ormconfig';

console.log(typeormConfig);

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeormConfig), PlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
