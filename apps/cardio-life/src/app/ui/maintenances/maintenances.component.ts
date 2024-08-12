import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarModule, CalendarView} from "angular-calendar";

import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {Maintenance} from "../../models/maintenance.model";
import {Observable} from "rxjs";
import {isSameDay, isSameMonth} from "date-fns";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {MaintenancesService} from "../../services/maintenances.service";

@Component({
  selector: 'app-maintenances',
  standalone: true,
  imports: [

    CalendarModule,

    RouterLink,
    NgSwitch,
    NgSwitchCase,
    CardModule,
    Button,
  ],
  templateUrl: './maintenances.component.html',
  styleUrl: './maintenances.component.css'
})
export class MaintenancesComponent implements OnInit {
  // public displayedColumns = ['eventId','deviceId',
  //   'datePerformed',"deviceBatteryStatus","electrodesDlc","eventStatus","calendarId"];
  public allEventsRequested!: Observable<Array<Maintenance>>;
  public performedEvents: Array<Maintenance> = [];
  public scheduledEvents: Array<Maintenance> = [];
  public events: Array<CalendarEvent>= [];
  public viewDate: Date = new Date();
  public view: CalendarView = CalendarView.Month;
  public activeDayIsOpen: boolean = false;
  public clientId!: string;
  private deviceId!: string;
  constructor(public mainService: MaintenancesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.clientId = this.activatedRoute.snapshot.params['clientId'];
    this.deviceId = this.activatedRoute.snapshot.params['deviceId'];

    if (this.clientId) {
      this.allEventsRequested = this.mainService.getAllMaintenancesByClient(this.clientId);
    } else if (this.deviceId) {
      this.allEventsRequested = this.mainService.getAllMaintenancesByDevice(this.deviceId);
    } else {
      this.allEventsRequested = this.mainService.getAllMaintenances();
    }

    this.allEventsRequested.subscribe(events => {
      this.sortEventsByStatus(events);
      this.transformEvents();
      console.log(`Events initialized, sorted, and transformed with result of: ${this.performedEvents.length}`);
    });
  }

  sortEventsByStatus(events: Array<Maintenance>) {
    this.performedEvents = [];
    this.scheduledEvents = [];

    events.forEach(event => {
      if (event.eventStatus) {
        this.performedEvents.push(event);
      } else {
        this.scheduledEvents.push(event);
      }
    });
  }

  transformEvents() {
    this.events = [];

    this.performedEvents.forEach(event => {
      let oneEvent: CalendarEvent = {
        title: `Maintenance of device: ${event.deviceId} in the possession of ${this.clientId}`,
        start: this.dateTimer(new Date(event.datePerformed + 'T00:00:00')),
        end: this.dateTimer(new Date(event.datePerformed + 'T00:00:00'))
      };
      this.events.push(oneEvent);
    });
  }

  dateTimer(ti: Date): Date {
    const newDate = ti;
    newDate.setHours(0, 0);
    console.log(newDate);
    return newDate;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !(isSameDay(date, this.viewDate) && this.activeDayIsOpen || events.length === 0);
    }
    this.viewDate = date;
  }
}
