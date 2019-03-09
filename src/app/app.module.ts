import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppProvider } from '../providers/app/app';
import { HttpClientModule } from '@angular/common/http';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { TablePage } from '../pages/table/table';
import { LogInPageModule } from '../pages/log-in/log-in.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TablePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    VirtualScrollerModule,
    LogInPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TablePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppProvider
  ]
})
export class AppModule {}
