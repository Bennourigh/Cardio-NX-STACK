import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsController, ClientsService } from '@cardio-life/clients';
import { DevicesController, DevicesService } from '@cardio-life/devices';
import { JobsController, JobsService } from '@cardio-life/jobs';

@Module({
  imports: [],
  controllers: [AppController,ClientsController,DevicesController,JobsController],
  providers: [AppService,ClientsService,DevicesService,JobsService],
})
export class AppModule {}
