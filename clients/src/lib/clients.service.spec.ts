import { Test } from '@nestjs/testing';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
