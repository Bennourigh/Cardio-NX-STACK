import {Component, OnInit} from '@angular/core';
import {MaintenancesService} from "../../services/maintenances.service";
import {Client} from "../../models/client.model";
import {Router, RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    RouterLink,
    CardModule,
    DividerModule,
    Button,
    TableModule,
    CheckboxModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

  public displayedColumns = ['clientName','emailAddress',"phoneNumber","History","Devices"];
  public dataSource:any;
  public clients:any;
  constructor(public mainService:MaintenancesService,private router:Router) {
  }
  ngOnInit(): void {
    this.initialize();
  }
  initialize(){
    this.mainService.getAllClients().subscribe({
      next:data=>{
        this.dataSource=data;
      }

    })
  }

  toEvents(element:Client) {
    let clientId = element.clientId
    this.router.navigateByUrl("/admin/maintenances/" + clientId).then()
  }
  toDevices(element:Client) {
    let clientId = element.clientId
    this.router.navigateByUrl("/admin/devices/" + clientId).then()
  }

  addDevice(element:Client) {
    let clientId = element.clientId
    this.router.navigateByUrl("/admin/add-device/" + clientId).then()

  }
}
