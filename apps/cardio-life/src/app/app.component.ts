import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  AddClientComponent,
  AddDeviceComponent, AdminTemplateComponent, ClientsComponent, ClientTemplateComponent, ConfirmComponent,
  DevicesComponent, LoginComponent,
  MaintenancesComponent,
  ScheduleComponent
} from '@cardio-life/ui';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    BrowserModule,
    AddDeviceComponent, AddClientComponent, ScheduleComponent, MaintenancesComponent, DevicesComponent, ClientsComponent,
    LoginComponent, ConfirmComponent, AdminTemplateComponent, ClientTemplateComponent, Button, ToolbarModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cardio-life';
}
