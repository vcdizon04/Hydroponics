import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {
  sensorData: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sensorData = this.navParams.get('data').reverse();
    console.log(this.sensorData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
  }

}
