import { Injectable } from '@nestjs/common';
import {  Maintenace, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()


@Injectable()
export class JobsService {
  public getJobs(): Promise<Maintenace[]> {
    return prisma.maintenace.findMany()
  }
  getJobById(id: number) {
    return prisma.maintenace.findUnique({
      where: {
        id: id
      }
    })
  }
  scheduleJob(newJob: Maintenace) {
    return prisma.maintenace.create(
      {data: newJob}
    )
  }
  updateJob(id: number, job: Maintenace) {
    return prisma.maintenace.update({
      where: {
        id: id
      },
      data: job
    })

  }
}
