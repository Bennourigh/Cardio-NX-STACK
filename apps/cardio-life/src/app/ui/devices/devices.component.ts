import {Component, OnInit, ViewChild} from '@angular/core';
import {MaintenancesService} from "../../services/maintenances.service";
import {Device} from "../../models/device.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ScheduleMaintenanceRequest} from "../../models/maintenance.model";
import {NgIf} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    DividerModule,
    TableModule,
    Button,
    CardModule
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {
  // public displayedColumns = ['deviceSN', 'type', "dateInstallation", "batteryLevel", "dlc", "History", "Schedule"];
  public dataSource: any;
  public clients: any;
  public clientId!: string;

  constructor(public mainService: MaintenancesService, public router: Router, public activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.initialize();
  }

  async addSchedulePossibility(devices: Device[]): Promise<Device[]> {
    for (const device of devices) {
      device.schedulePossible = !!this.mainService.schedulePossibility(device.deviceId);
    }
    return devices;
  }

  async initialize() {
    this.clientId = this.activatedRoute.snapshot.params['clientId'];

    if (this.clientId) {
      this.mainService.getAllDevicesByClient(this.clientId).subscribe({
        next: async data => {
          this.dataSource = await this.addSchedulePossibility(data);

        }
      });
    } else {
      this.mainService.getAllDevices().subscribe({
        next: async data => {
          this.dataSource = await this.addSchedulePossibility(data);

        }
      });
    }
  }

  toEvents(element: Device) {
    let deviceId: string = element.deviceId
    this.router.navigateByUrl("/admin/maintenances/" + deviceId);
  }

  schedule(element: Device) {
    if (this.clientId) {
      let deviceId: string = element.deviceId
      let clientId: string = this.clientId
      let request: ScheduleMaintenanceRequest = {clientId, deviceId}
      this.mainService.scheduleMaintenance(request).subscribe({
        next: data => {
          console.log(data)
        }
      });
      //   this.router.navigateByUrl("/admin/clients");
      this.router.navigateByUrl("/admin/devices/schedule/" + element.deviceId)
    }
  }
}
