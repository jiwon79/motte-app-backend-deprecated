import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { Plan } from './plan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockPlanRepository = () => ({
  save: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

const mockCreateDto = {
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
};

const mockPlan = {
  id: 1,
  date: '2022-01-01',
  title: 'title',
  tag: '[]',
  // location: '',
  // channel: '',
  // content: '',
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('Plans Service', () => {
  let service: PlansService;
  let planRepository: MockRepository<Plan>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        {
          provide: getRepositoryToken(Plan),
          useValue: mockPlanRepository(),
        },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    planRepository = module.get<MockRepository<Plan>>(getRepositoryToken(Plan));
  });

  describe('create()', () => {
    it('should call repository creat with correct value', async () => {
      const createSpy = jest.spyOn(planRepository, 'create');
      await service.create(mockCreateDto);

      expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    });

    it('should throw if repository create throws', async () => {
      jest.spyOn(planRepository, 'save').mockRejectedValueOnce(new Error());

      await expect(service.create(mockCreateDto)).rejects.toThrow(new Error());
    });

    it('should create Plans', async () => {
      jest.spyOn(planRepository, 'save').mockResolvedValue(mockPlan);
      const result = await service.create(mockCreateDto);

      expect(result.title).toEqual('title');
      expect(result.date).toEqual('2022-01-01');
      expect(result.tag).toEqual('[]');
    });
  });
});
