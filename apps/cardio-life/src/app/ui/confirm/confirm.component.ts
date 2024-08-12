import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaintenancesService} from "../../services/maintenances.service";
import {Maintenance, PerformedMaintenanceRequest} from "../../models/maintenance.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  public confirmationForm!:FormGroup;
  public maintenanceId!: string;
  public confirmRequest!:PerformedMaintenanceRequest;
  public target!: Maintenance;
  constructor(protected maintenanceService:MaintenancesService,private activatedRoute: ActivatedRoute,private router:Router, private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.target= this.maintenanceService.getTargetMaintenance();
    this.maintenanceId = this.activatedRoute.snapshot.params['maintenanceId']
    if (this.maintenanceId){
    this.confirmationForm = this.fb.group({
      datePerformed: this.fb.control(Date, Validators.required),
      deviceBatteryStatus: this.fb.control('', Validators.required),
      electrodesDlc: this.fb.control(Date, Validators.required),
    })}
  }
  save(form : FormGroup) {
    this.confirmRequest = {
      clientId: this.maintenanceService.clientId(),
      deviceId: this.target.deviceId,
      maintenanceId: this.target.eventId,
      datePerformed: form.value.datePerformed,
      deviceBatteryStatus: form.value.deviceBatteryStatus,
      electrodesDlc: form.value.electrodesDlc
    }
    this.maintenanceService.confirmMaintenance(this.confirmRequest).subscribe(response => {
      console.log("Maintenance confirmed successfully", response);
      this.router.navigateByUrl("/admin/maintenances/"+this.maintenanceService.clientId());
      this.maintenanceService.clientId.set("");
    }, error => {
      console.error("Error confirming maintenance :", error);
    });
  }
}
