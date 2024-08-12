import { Injectable } from '@nestjs/common';
import { Client, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

@Injectable()
export class ClientsService {
  public getClients(): Promise<Client[]> {
    return prisma.client.findMany()
  }

  getClientById(id: number) {
    return prisma.client.findUnique(
      { where: { clientId: id } }
    )
  }

  createClient(client: Client) {
    return prisma.client.create(
      { data: client}
    )

  }
 updateClient(id: number, client: Client) {
    return prisma.client.update({
      where: { clientId: id },
      data: client
    })
 }
}
