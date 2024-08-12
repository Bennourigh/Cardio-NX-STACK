import { Test } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ClientsService],
      controllers: [ClientsController],
    }).compile();

    controller = module.get(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
