import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Maintenace } from '@prisma/client';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {
  }

  @Get()
  public getJobs() {
    return this.jobsService.getJobs();
  }

  @Get(':id')
  public getJobById(@Param('id') id: number) {
    return this.jobsService.getJobById(id);
  }

  @Post('new-job')
  public scheduleJob(newJob: Maintenace) {
    return this.jobsService.scheduleJob(newJob);
  }

  @Put(':id')
  public updateJob(@Param('id') id: number, job: Maintenace) {
    return this.jobsService.updateJob(id, job);
  }
}
