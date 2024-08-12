import {Maintenance} from "./maintenance.model";

export interface Client{
  clientId: string,
  clientName: string,
  emailAddress: string,
  phoneNumber: string,
}
export interface AddClient {
  clientName: string,
   emailAddress: string,
   phoneNumber: string
}
export interface Calendar{
  calendarId: string,
  clientId: string,
  events: Array<Maintenance>
}
