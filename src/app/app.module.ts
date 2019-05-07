import { HomePage } from './home/home.page';
import { ModalLoginPage } from './modals/modal-login/modal-login.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//App
import { environment } from './../environments/environment';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';


@NgModule({
  declarations: [AppComponent, ModalLoginPage],
  entryComponents: [AppComponent, ModalLoginPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Toast,
    HomePage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
