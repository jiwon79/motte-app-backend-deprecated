import { CreatePlanDto } from 'src/plans/dto/create-plan.dto';
import { UpdatePlanDto } from 'src/plans/dto/update-plan.dto';

export const mockCreateDto: CreatePlanDto = {
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
};

export const mockUpdateDto: UpdatePlanDto = {
  date: '2022-01-02',
  title: 'new title',
};

export const mockPlan = {
  id: 1,
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
  // location: '',
  // channel: '',
  // content: '',
};
