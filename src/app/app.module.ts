import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//************ */ firebase
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
firebase.initializeApp(environment.firebaseConfig);

//********** */ environment
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { IonicStorageModule } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CalendarModule } from 'ion2-calendar';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode3';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpModule } from '@angular/http';
import { Printer } from '@ionic-native/printer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    CalendarModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    NgxQRCodeModule,
    HttpModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    AngularFireDatabase,
    AngularFirestore,
    Calendar,
    BarcodeScanner,
    Base64ToGallery,
    AndroidPermissions,
    Printer,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
