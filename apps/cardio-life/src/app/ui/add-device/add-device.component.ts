import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaintenancesService} from "../../services/maintenances.service";
import {AddDevice} from "../../models/device.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Button,
    CalendarModule,
    InputTextModule,
    CardModule,
  ],
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
  public clientForm!:FormGroup;
  public device!:AddDevice;
  constructor(private router:Router,protected maintenanceService:MaintenancesService,private activatedRoute: ActivatedRoute, private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientId: this.fb.control(''),
      deviceSN: this.fb.control('', Validators.required),
      dateInstallation: this.fb.control(Date, Validators.required),
      type: this.fb.control("", Validators.required),
      batteryLevel: this.fb.control(1.00, Validators.required),
      dlc: this.fb.control(Date, Validators.required),
    })
  }
  saveProduct(form : FormGroup) {
    let clientId = this.activatedRoute.snapshot.params["clientId"]
    this.device = {
      clientId: clientId,
      deviceSN: form.value.deviceSN,
      dateInstallation:form.value.dateInstallation,
      type: form.value.type,
      batteryLevel: form.value.batteryLevel,
      dlc:form.value.dlc
    }
    this.maintenanceService.addDevice(this.device).subscribe({
        next: (data) => {
          console.log(data)

        }, error: (err) => {
          console.log(err)
        }
      });
    this.router.navigateByUrl("/admin/clients")
  }

}
