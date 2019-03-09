import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }
  updateStatus(type, status) {
    return this.http.get<any>('https://myhydroponics.000webhostapp.com/change_status.php', {params: {type: type, status: status }});
  }
  updateLatesSensor(temperature, id) {
    return this.http.get<any>('https://myhydroponics.000webhostapp.com/update_latest_sensor.php', {params: {temperature: temperature, id: id }});
  }
  getWaterStatus() {
    return this.http.get<any>('https://myhydroponics.000webhostapp.com/water.php');
  }
  getLightStatus() {
    return this.http.get<any>('https://myhydroponics.000webhostapp.com/light.php');
  }
  getDataSensors(){
    return this.http.get<any>('https://myhydroponics.000webhostapp.com/sensors.php');
  }
  signIn(user) {
    return this.http.get<any>('https://myhydroponics.000webhostapp.com/login.php', { params: user });
  }
}
