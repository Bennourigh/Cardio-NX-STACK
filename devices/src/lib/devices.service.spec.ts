import { Test } from '@nestjs/testing';
import { DevicesService } from './devices.service';

describe('DevicesService', () => {
  let service: DevicesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DevicesService],
    }).compile();

    service = module.get(DevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
