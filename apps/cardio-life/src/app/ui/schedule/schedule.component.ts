import {Component, ViewChild} from '@angular/core';
import {MaintenancesService} from "../../services/maintenances.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {Maintenance} from "../../models/maintenance.model";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    NgIf,
    TableModule,
    CardModule,
    Button
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  public displayedColumns = ['deviceId',"datePerformed",  "deviceBatteryStatus", "electrodesDlc", "confirm"];
  public dataSource: any;
  public clients: any;
  public deviceId!: string;

  constructor(public mainService: MaintenancesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.deviceId = this.activatedRoute.snapshot.params["deviceId"];
    if (this.deviceId) {
      this.mainService.getAllMaintenancesByDevice(this.deviceId).subscribe({
        next: data => {
          this.dataSource = data;

        }
      })
    } else {
      this.mainService.getAllMaintenances().subscribe({
        next: data => {
          this.clients = data;
        }
      })
    }
  }

  toConfirm(element: Maintenance) {
    let maintenanceId = element.eventId
    this.mainService.setTargetMaintenance(element)
    this.router.navigateByUrl("/admin/devices/confirm/" + maintenanceId);
  }


}
