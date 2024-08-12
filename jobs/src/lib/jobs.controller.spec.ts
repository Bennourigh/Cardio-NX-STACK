import { Test } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JobsService],
      controllers: [JobsController],
    }).compile();

    controller = module.get(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
