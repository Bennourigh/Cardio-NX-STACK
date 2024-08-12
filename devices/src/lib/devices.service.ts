import { Injectable } from '@nestjs/common';
import {  Device, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class DevicesService {
  public getDevices(): Promise<Device[]> {
    return prisma.device.findMany()
  }

  getDeviceById(id: number) {
    return prisma.device.findUnique({
      where: {
        deviceId: id
      }
    })
  }

  createDevice(device: Device) {
    return prisma.device.create(
      {data: device}
    )

  }

  updateDevice(device: Device) {
    return prisma.device.update(
      {where: {deviceId: device.deviceId}, data: device}
    )

  }
}
