import { Test } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DevicesService],
      controllers: [DevicesController],
    }).compile();

    controller = module.get(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
