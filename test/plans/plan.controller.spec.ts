import { PlansController } from 'src/plans/plans.controller';
import { PlansService } from 'src/plans/plans.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mockPlan, mockUpdateDto } from './mockPlan';

const mockPlanService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('Plan Controller', () => {
  let controller: PlansController;
  let service: PlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [
        {
          provide: PlansService,
          useValue: mockPlanService,
        },
      ],
    }).compile();

    controller = module.get<PlansController>(PlansController);
    service = module.get<PlansService>(PlansService);
  });

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call service - findAll method', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      await controller.findAll();

      expect(findSpy).toHaveBeenCalled();
    });

    it('should throw - service throw error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      await expect(controller.findAll()).rejects.toThrow(new Error());
    });

    it('should return plans - success', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockPlan]);
      const response = await controller.findAll();

      expect(response).toEqual([mockPlan]);
    });
  });

  describe('findOne', () => {
    it('should correct param - findOne method', async () => {
      const findSpy = jest.spyOn(service, 'findOne');
      await controller.findOne(10);

      expect(findSpy).toHaveBeenCalledWith(10);
    });

    it('should throw - findOne method throw error', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      await expect(controller.findOne(10)).rejects.toThrow(new Error());
    });

    it('should return plan - success', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPlan);
      const response = await controller.findOne(10);

      expect(response).toEqual(mockPlan);
    });
  });

  describe('create()', () => {
    it('should correct param - create method', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await controller.create(mockPlan);

      expect(createSpy).toHaveBeenCalledWith(mockPlan);
    });

    it('should throw - create method throw error', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(controller.create(mockPlan)).rejects.toThrow(new Error());
    });

    it('should return plan - success', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockPlan);
      const response = await controller.create(mockPlan);

      expect(response).toEqual(mockPlan);
    });
  });

  describe('update()', () => {
    it('should correct params - update method', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await controller.update(10, mockUpdateDto);

      expect(updateSpy).toHaveBeenCalledWith(10, mockUpdateDto);
    });

    it('should throw - update method throw error', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      await expect(controller.update(10, mockUpdateDto)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('delete()', () => {
    it('should correct params - delete method', async () => {
      const deleteSpy = jest.spyOn(service, 'delete');
      await controller.delete(10);

      expect(deleteSpy).toHaveBeenCalledWith(10);
    });

    it('should throw - delete method throw error', async () => {
      jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

      await expect(controller.delete(10)).rejects.toThrow(new Error());
    });
  });
});
