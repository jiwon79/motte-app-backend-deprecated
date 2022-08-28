import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly tag: string;

  @IsString()
  readonly location?: string;

  @IsString()
  readonly channel?: string;

  @IsString()
  readonly content?: string;
}
