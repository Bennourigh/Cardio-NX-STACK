import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from '@prisma/client';

@Controller('devices')
export class DevicesController {

  constructor(private devicesService: DevicesService) {
  }
  @Get()
  public getDevices() {
    return this.devicesService.getDevices();
  }
  @Get(':id')
  public getDeviceById(@Param('id') id: number) {
    return this.devicesService.getDeviceById(id);
  }
  @Post('new-device')
  public createDevice(@Body() device: Device) { // @Body() device: Device
    return this.devicesService.createDevice(device);
  }
  @Put('update-device')
  public updateDevice(@Body() device: Device) {
    return this.devicesService.updateDevice(device);
  }
}



