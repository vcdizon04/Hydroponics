import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { HomePage } from '../home/home';

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  username: String;
  password: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appProvider: AppProvider, 
    public loading: LoadingController,
    public alert: AlertController,
    public toast: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  signIn() {
    const loader = this.loading.create({
      content: 'Signing in please wait..'
    });
    loader.present();
    console.log(this.username, this.password);
    this.appProvider.signIn({ username: this.username, password: this.password }).subscribe(res => {
      console.log(res);
      if(res === 'Error') {
        this.toast.create({
          duration: 2000,
          message: 'Invalid credentials'
        }).present();
      } else {
        this.navCtrl.setRoot(HomePage);
        localStorage.setItem('isAuthenticated', 'true');
      }
      loader.dismiss();
    }, err => {
      loader.dismiss();
     this.alert.create({
        message: 'Error please try again',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      })
    })
  }

}
