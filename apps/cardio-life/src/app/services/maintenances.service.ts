import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Maintenance, PerformedMaintenanceRequest, ScheduleMaintenanceRequest} from "../models/maintenance.model";
import {AddDevice, Device, UpdateDeviceRequest} from "../models/device.model";
import {AddClient, Calendar, Client} from "../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class MaintenancesService {
  private MaintenanceTarget!:Maintenance;
  clientId=signal<String>("")
  private rUrl='http://localhost:8086/maintenance/query'
  private wUrl='http://localhost:8085/maintenance/command'
  constructor(private http:HttpClient) { }
  setTargetMaintenance(target:Maintenance){
    this.MaintenanceTarget=target
  }
  getTargetMaintenance(){
    return this.MaintenanceTarget;
  }

  getAllDevices(): Observable<Array<Device>>{
    return this.http.get<Array<Device>>(this.rUrl+"/devices/all");
  }
  getAllDevicesByClient(clientId:string): Observable<Array<Device>>{
    return this.http.get<Array<Device>>(this.rUrl+"/clients/"+clientId+"/devices");
  }

  getAllDevicesByClientMail(clientId: string): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(this.rUrl + "/clients/" + clientId);
  }
  schedulePossibility(deviceId:String):Observable<boolean>{
    return this.http.get<boolean>(this.rUrl+"devices/{deviceId}/forgotten");
  }
  getAllClients(): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(this.rUrl+"/clients");
  }
  getAllMaintenances(): Observable<Array<Maintenance>>{
    return this.http.get<Array<Maintenance>>(this.rUrl + "/devices/events")
  }
  getAllMaintenancesByDevice(deviceId:string): Observable<Array<Maintenance>>{
    return this.http.get<Array<Maintenance>>(this.rUrl+"/devices/"+deviceId+"/events");
  }
  getAllMaintenancesByClient(clientId:string): Observable<Array<Maintenance>>{
    return this.http.get<Array<Maintenance>>(this.rUrl+"/clients/"+clientId+"/events");
  }
  getCalendarByClient(clientId:string): Observable<Calendar>{
    return this.http.get<Calendar>(this.rUrl+"/clients/calendar"+clientId);
  }
  addClient(client :AddClient) : Observable<Object> {
    return this.http.post(this.wUrl+"/addClient",client);
  }
  updateClient(client :Client) : Observable<Object>{
    return this.http.post(this.wUrl+"/updateClient",client);
  }
  addDevice(addDevice :AddDevice)  {
    return this.http.post(this.wUrl+"/addDevice",addDevice);
  }
  updateDevice(updateDevice :UpdateDeviceRequest):Observable<Object>{
    return this.http.post(this.wUrl+"/updateDevice",updateDevice);
  }
  // changeBattery(changeBattery :ChangeBatteryRequest):Observable<Object>{
  //     return this.http.post(this.wUrl+"/changeBattery",changeBattery);
  // }
  // changeElect(changeElect :ChangeElectRequest):Observable<Object>  {
  //   return this.http.post(this.wUrl+"/changeElectrodes",changeElect);
  // }
  scheduleMaintenance(maintenance :ScheduleMaintenanceRequest):Observable<Object>{
    return this.http.post(this.wUrl+"/scheduleMaintenance",maintenance);
  }
  confirmMaintenance(maintenance :PerformedMaintenanceRequest):Observable<Object>{
    return this.http.post(this.wUrl+"/confirmMaintenance",maintenance);
  }

}

