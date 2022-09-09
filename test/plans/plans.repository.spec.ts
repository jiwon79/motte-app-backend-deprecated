import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlansRepository } from 'src/plans/plans.repository';
import { Plan } from 'src/plans/plan.entity';
import { mockCreateDto, mockPlan, mockUpdateDto } from './mockPlan';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockOrmRepository: MockRepository<Plan> = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
};

describe('Plans Repository', () => {
  let repository: PlansRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlansRepository,
        {
          provide: getRepositoryToken(Plan),
          useValue: mockOrmRepository,
        },
      ],
    }).compile();

    repository = module.get<PlansRepository>(PlansRepository);
  });

  describe('create()', () => {
    it('should create a new Plan', async () => {
      jest.spyOn(mockOrmRepository, 'create').mockResolvedValue(mockPlan);

      const response = await repository.create(mockCreateDto);

      expect(response.id).toBeTruthy();
      expect(response.title).toEqual(mockPlan.title);
      expect(response.date).toEqual(mockPlan.date);
      expect(response.tag).toEqual(mockPlan.tag);
    });

    it('should throw - orm create method throw error', async () => {
      jest
        .spyOn(mockOrmRepository, 'create')
        .mockRejectedValueOnce(new Error());

      await expect(repository.create(mockCreateDto)).rejects.toThrow(
        new Error(),
      );
    });

    it('should throw - orm save method throw error', async () => {
      jest.spyOn(mockOrmRepository, 'save').mockRejectedValueOnce(new Error());

      await expect(repository.create(mockCreateDto)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('findAll()', () => {
    it('should return all plans', async () => {
      jest.spyOn(mockOrmRepository, 'find').mockResolvedValue([mockPlan]);

      const response = await repository.findAll();

      expect(response).toEqual([mockPlan]);
    });

    it('should throw - orm find method throw error', async () => {
      jest.spyOn(mockOrmRepository, 'find').mockRejectedValueOnce(new Error());

      await expect(repository.findAll()).rejects.toThrow(new Error());
    });
  });

  describe('findById()', () => {
    it('should return a plan', async () => {
      jest.spyOn(mockOrmRepository, 'findOne').mockResolvedValue(mockPlan);

      const response = await repository.findById(10);

      expect(response).toEqual(mockPlan);
    });

    it('should throw - orm findOne method throw error', async () => {
      jest
        .spyOn(mockOrmRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      await expect(repository.findById(10)).rejects.toThrow(new Error());
    });
  });

  describe('update()', () => {
    it('should correct param - orm update method', async () => {
      const updateSpy = jest.spyOn(mockOrmRepository, 'update');

      await repository.update(10, mockUpdateDto);

      expect(updateSpy).toHaveBeenCalledWith(10, mockUpdateDto);
    });

    it('should throw - orm update method throw error', async () => {
      jest
        .spyOn(mockOrmRepository, 'update')
        .mockRejectedValueOnce(new Error());

      await expect(repository.update(10, mockUpdateDto)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('delete()', () => {
    it('should correct param - orm delete method', async () => {
      const deleteSpy = jest.spyOn(mockOrmRepository, 'softDelete');

      await repository.delete(10);

      expect(deleteSpy).toHaveBeenCalledWith(10);
    });

    it('should throw - orm delete method throw error', async () => {
      jest
        .spyOn(mockOrmRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());

      await expect(repository.delete(10)).rejects.toThrow(new Error());
    });
  });
});
