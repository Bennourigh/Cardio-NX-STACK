import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from '@prisma/client';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}
  @Get()
  public getClients() {
    return this.clientsService.getClients()
  }
  @Get(':id')
  public getClientById(@Param('id') id: number) {
    return this.clientsService.getClientById(id)
  }
  @Post('new-client')
  public createClient(newClient: Client){
    return this.clientsService.createClient(newClient)
  }
  @Put('update-client')
  public updateClient(client: Client){
    return this.clientsService.updateClient(client.clientId,client)
  }
}
