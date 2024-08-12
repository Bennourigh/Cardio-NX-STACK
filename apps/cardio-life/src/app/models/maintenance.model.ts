export interface Maintenance{
  eventId: string,
  deviceId: string,
  datePerformed : Date,
  deviceBatteryStatus : number,
  electrodesDlc: Date,
  eventStatus : boolean,
  calendarId: string
}
export interface ScheduleMaintenanceRequest{
  clientId: String,
  deviceId: String,
}
export interface PerformedMaintenanceRequest{
  clientId: String,
  deviceId: String,
  maintenanceId: String,
  datePerformed: Date,
  deviceBatteryStatus: number,
  electrodesDlc: Date
}
