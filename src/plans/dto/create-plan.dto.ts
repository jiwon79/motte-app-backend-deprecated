import { IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  readonly date: string;

  @IsString()
  title: string;

  @IsString()
  tag: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  channel: string;

  @IsOptional()
  @IsString()
  content: string;
}
