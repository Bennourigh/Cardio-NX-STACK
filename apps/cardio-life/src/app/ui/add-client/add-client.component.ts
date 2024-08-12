import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaintenancesService} from "../../services/maintenances.service";

import {Router} from "@angular/router";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Button,
    InputTextModule,
    CardModule,
    NgIf,
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
  public clientForm!:FormGroup;

  constructor(protected maintenanceService: MaintenancesService, private fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientName: this.fb.control('', Validators.required),
      emailAddress: this.fb.control('', Validators.required),
      phoneNumber: this.fb.control('', Validators.required,Validators.pattern.prototype(/^\(\d{3}\) \d{2}-\d{6}$/)),

    })
  }
  saveClient(form : FormGroup) {
    let client = form.value
    this.maintenanceService.addClient(client).subscribe(
      () => {
        console.log('Client added successfully');
        form.reset();
        this.router.navigateByUrl('/admin/clients');
      },
      (error) => console.error(error)
    );
  }
}
