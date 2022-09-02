import { CreatePlanDto } from 'src/plans/dto/create-plan.dto';
import { UpdatePlanDto } from 'src/plans/dto/update-plan.dto';
import { Plan } from 'src/plans/plan.entity';

export const mockCreateDto: CreatePlanDto = {
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
};

export const mockCreateWithAllField: CreatePlanDto = {
  date: '2022-01-02',
  title: 'title1',
  tag: '[]',
  channel: 'channel',
  location: 'location',
  content: 'content',
};

export const mockUpdateDto: UpdatePlanDto = {
  date: '2022-01-02',
  title: 'new title',
};

export const mockPlan: Plan = {
  id: 1,
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
  location: null,
  channel: null,
  content: null,
};
