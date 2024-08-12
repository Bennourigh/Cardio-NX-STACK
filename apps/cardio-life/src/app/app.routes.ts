import { Route } from '@angular/router';
import {
  AddClientComponent,
  AddDeviceComponent, ClientsComponent, ClientTemplateComponent,
  ConfirmComponent,
  DevicesComponent, MaintenancesComponent,
  ScheduleComponent
} from '@cardio-life/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'maintenances',
    pathMatch: 'full'
  },
  {
    path: 'devices/confirm/:maintenanceId',
    component: ConfirmComponent,
    // canActivate: [AuthGuard],
    // data: {roles: ['ADMIN']}
  },
  {
    path: 'devices/schedule/:deviceId',
    component: ScheduleComponent,
    // canActivate: [AuthGuard],
    // data: {roles: ['ADMIN']}
  },
  {
    path: 'add-client',
    component: AddClientComponent,
    // canActivate: [AuthGuard],
    // data: {roles: ['ADMIN']}
  },
  {path: 'add-device/:clientId',
    component: AddDeviceComponent,
   },
  {path: 'devices', component: DevicesComponent},
  {path: 'devices/:clientId', component: DevicesComponent,},
  {path: 'clients', component: ClientsComponent},
  {path: 'maintenances', component: MaintenancesComponent},
  {
    path: 'maintenances/:deviceId',
    component: MaintenancesComponent,

  },
  {
    path: 'maintenances/:clientId',
    component: MaintenancesComponent,

  },
  {
    path: "client", component: ClientTemplateComponent,
  }


];
