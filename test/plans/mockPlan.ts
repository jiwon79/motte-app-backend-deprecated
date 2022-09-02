import { CreatePlanDto } from 'src/plans/dto/create-plan.dto';
import { UpdatePlanDto } from 'src/plans/dto/update-plan.dto';
import { Plan } from 'src/plans/plan.entity';

/// mockPlan 을 만드는 dto
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

/// mockCreateDto 로부터 만들어진 Plan entity
export const mockPlan: Plan = {
  id: 1,
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
  location: null,
  channel: null,
  content: null,
};
