export interface Device{
  deviceId: string,
  deviceSn: string,
  type: string,
  dateInstallation : Date,
  batteryLevel : number,
  electrodesDlc: Date,
  schedulePossible?: boolean;
}

export interface AddDevice{
 clientId: String,
 deviceSN: String,
 dateInstallation: String,
 type: String,
 batteryLevel: number,
 dlc: String
}
export interface UpdateDeviceRequest{
   clientId: String,
   deviceId: String,
   deviceSN: String,
   dateInstallation: Date,
   type: String,
   batteryLevel: number,
   dlc: Date
}
export interface ChangeBatteryRequest{
   clientId: String,
   deviceId: String,
   batteryLevel: number
}
export interface ChangeElectRequest{
   clientId: String,
   deviceId: String,
   dlc: Date
}
