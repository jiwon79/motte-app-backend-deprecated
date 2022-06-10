import { IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  readonly date: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly tag: string;

  @IsOptional()
  @IsString()
  readonly location: string;

  @IsOptional()
  @IsString()
  readonly channel: string;

  @IsOptional()
  @IsString()
  readonly content: string;
}
