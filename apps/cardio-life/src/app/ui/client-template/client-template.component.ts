import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MaintenancesService} from "../../services/maintenances.service";
import {KeycloakService} from "keycloak-angular";
import {NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-client-template',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    TableModule,
    CardModule,
  ],
  templateUrl: './client-template.component.html',
  styleUrl: './client-template.component.css'
})
export class ClientTemplateComponent implements OnInit {

  kc = inject(KeycloakService)
  public displayedColumns = ['deviceSN', 'type', "dateInstallation", "batteryLevel", "dlc"];
  public dataSource: any;
  public email!: string;
  profiler!: any
  devices!: any

  constructor(public mainService: MaintenancesService, public router: Router) {
  }

  async ngOnInit() {
    this.profiler = (await this.kc.loadUserProfile()).email;
    this.initializer()
  }

  initializer() {
    this.mainService.getAllDevicesByClientMail(this.profiler).subscribe({
      next: data => {
        this.dataSource = data;

      }
    })
  }
}
