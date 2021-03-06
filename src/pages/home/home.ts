import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { TablePage } from '../table/table';
import { LogInPage } from '../log-in/log-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isWaterChecked: boolean;
  isLightChecked: boolean;
  sensorData: Array<any> = [];
  latestSensorData: any;
  latestId: Number;
  temperature: String;

  constructor(public navCtrl: NavController, public appProvider: AppProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toast: ToastController) {
    this.init()
    this.appProvider.getDataSensors().subscribe(res => {
      console.log(res);
      this.sensorData = res;
      this.latestSensorData = this.sensorData[this.sensorData.length -1];
      this.latestId = this.latestSensorData.sensor_id;
      console.log(this.latestSensorData)
    })
  }
  init() {
    const loader = this.loadingCtrl.create({
      content: 'Loading please wait..'
    });
    loader.present();
    this.appProvider.getLightStatus().subscribe(res => this.isLightChecked = res === 1 ? true : false)
    this.appProvider.getWaterStatus().subscribe(res => {
      this.isWaterChecked = res === 1 ? true : false
      loader.dismiss();
    })

  }
  updateTemperature() {
    const loader = this.loadingCtrl.create({
      content: 'Loading please wait..'
    })
    loader.present();
    console.log(this.isLightChecked, this.isWaterChecked);
    this.appProvider.updateStatus('temp', this.temperature).subscribe( res => {
      console.log(res);
      loader.dismiss();
      this.toast.create( {
        message: `Temparature successfully set to ${this.temperature}`,
        duration: 2000
      }).present();
    },  err => {
      loader.dismiss();
      this.alertCtrl.create({
        title: 'Error',
        message: 'Please try again.',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).present();
      console.log(err);
    })
  }
  updateStatus(type, model) {
    const loader = this.loadingCtrl.create({
      content: 'Loading please wait..'
    })
    loader.present();
    console.log(this.isLightChecked, this.isWaterChecked);
    const status = this[model] ? 1 : 0;
    this.appProvider.updateStatus(type, status).subscribe( res => {
      console.log(res);
      loader.dismiss();
      this.toast.create( {
        message: `${type === 'water' ? 'Pump' : 'Light'} successfully turn ${this[model] ? 'on' : 'off'}`,
        duration: 2000
      }).present();
      // this.init();
    },  err => {
      loader.dismiss();
      this.alertCtrl.create({
        title: 'Error',
        message: 'Please try again.',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).present();
      console.log(err);
    })
  }
  
  updateLatesSensor() {
    const loader = this.loadingCtrl.create({
      content: "Updating please wait..."
    });
    loader.present();
    this.appProvider.updateLatesSensor(this.temperature, this.latestId).subscribe(res => {
      console.log(res)
      this.appProvider.getDataSensors().subscribe(res => {
        console.log(res);
        this.sensorData = res;
        this.latestSensorData = this.sensorData[this.sensorData.length -1];
        this.latestId = this.latestSensorData.sensor_id;
        console.log(this.latestSensorData)
        loader.dismiss();
      })
    }, err => {
      loader.dismiss();
      alert("Error Updating try again..");
    })
    console.log(this.temperature , this.latestId)
  }

  gotoTable(){
    this.navCtrl.push(TablePage, { data: this.sensorData});
  }

  signOut() {
   this.alertCtrl.create({
     title: 'Log out',
     message: 'Are you sure you want to log out?',
     buttons: [
       {
         text: 'Ok',
         handler: () => {
          localStorage.clear();
          this.navCtrl.setRoot(LogInPage);
         }
       },
       {
         text: 'Cancel'
       }
     ]
   }).present();
  }

}
