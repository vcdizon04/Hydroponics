import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isWaterChecked: boolean;
  isLightChecked: boolean;
  sensorData: Array<any> = [];

  constructor(public navCtrl: NavController, public appProvider: AppProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toast: ToastController) {
    this.init()
    this.appProvider.getDataSensors().subscribe(res => this.sensorData = res)
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

  updateStatus(type, model) {
    const loader = this.loadingCtrl.create({
      content: 'Loading please wait..'
    })
    loader.present();
    console.log(this.isLightChecked, this.isWaterChecked);
    const status = this[model] ? 1 : 0;
    // const lightStatus = this.isLightChecked ? 1 : 0;

    // this.appProvider.updateStatus('water', waterStatus).subscribe( res => {
    //   console.log(res);
    // }, err => {
    //   // this.alertCtrl.create({
    //   //   title: 'Error',
    //   //   message: 'Please try again.',
    //   //   buttons: [
    //   //     {
    //   //       text: 'Ok'
    //   //     }
    //   //   ]
    //   // }).present();
    //   console.log(err);
    // })
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
  

}
