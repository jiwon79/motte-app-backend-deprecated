import { Test, TestingModule } from '@nestjs/testing';
import { PlansRepository } from 'src/plans/plans.repository';
import { PlansService } from 'src/plans/plans.service';
import { mockPlan, mockCreateDto, mockUpdateDto } from './mockPlan';

const mockPlanRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('Plans Service', () => {
  let service: PlansService;
  let plansRepository: PlansRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        {
          provide: PlansRepository,
          useValue: mockPlanRepository,
        },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    plansRepository = module.get<PlansRepository>(PlansRepository);
  });

  describe('create()', () => {
    it('should correct param - repository create method', async () => {
      const createSpy = jest.spyOn(plansRepository, 'create');
      await service.create(mockCreateDto);

      expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    });

    it('should throw - repository create method throws', async () => {
      jest.spyOn(plansRepository, 'create').mockRejectedValueOnce(new Error());

      await expect(service.create(mockCreateDto)).rejects.toThrow(new Error());
    });

    it('should create Plans', async () => {
      jest.spyOn(plansRepository, 'create').mockResolvedValue(mockPlan);
      const result = await service.create(mockCreateDto);

      expect(result.title).toEqual('title');
      expect(result.date).toEqual('2022-01-01');
      expect(result.tag).toEqual('[]');
    });
  });

  describe('findAll()', () => {
    it('should call repository findAll', async () => {
      const findAllSpy = jest.spyOn(plansRepository, 'findAll');

      await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
    });

    it('should throw - repository findAll method throws', async () => {
      jest.spyOn(plansRepository, 'findAll').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrow(new Error());
    });

    it('should return plans on success', async () => {
      const mockResponse = [mockPlan];

      jest.spyOn(plansRepository, 'findAll').mockResolvedValue(mockResponse);
      const response = await service.findAll();

      expect(response).toEqual(mockResponse);
    });
  });

  describe('findById()', () => {
    it('should correct param - repository findById method called', async () => {
      const findSpy = jest.spyOn(plansRepository, 'findById');

      await service.findOne(10);

      expect(findSpy).toHaveBeenCalledWith(10);
    });

    it('should throw - repository findById method throws', async () => {
      jest
        .spyOn(plansRepository, 'findById')
        .mockRejectedValueOnce(new Error());

      await expect(service.findOne(10)).rejects.toThrow(new Error());
    });

    it('should return a plan on success', async () => {
      jest.spyOn(plansRepository, 'findById').mockResolvedValue(mockPlan);

      const response = await service.findOne(10);

      expect(response).toEqual(mockPlan);
    });
  });

  describe('update()', () => {
    it('should correct param - repository update method called', async () => {
      const updateSpy = jest.spyOn(plansRepository, 'update');

      await service.update(10, mockUpdateDto);

      expect(updateSpy).toBeCalledWith(10, mockUpdateDto);
    });

    it('should throw - repository throws method throw error', async () => {
      jest.spyOn(plansRepository, 'update').mockRejectedValueOnce(new Error());

      await expect(service.update(10, mockUpdateDto)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('delete()', () => {
    it('should correct param - repository delete method called', async () => {
      const deleteSpy = jest.spyOn(plansRepository, 'delete');

      await service.delete(10);

      expect(deleteSpy).toBeCalledWith(10);
    });

    it('should throw - repository delete method throw error', async () => {
      jest.spyOn(plansRepository, 'delete').mockRejectedValueOnce(new Error());

      await expect(service.delete(10)).rejects.toThrow(new Error());
    });
  });
});
