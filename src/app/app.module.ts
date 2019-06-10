import { ModalEditInfoPage } from './modals/modal-edit-info/modal-edit-info.page';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { EditComponent } from './components/edit/edit.component';
import { ModalEditPage } from './modals/modal-edit/modal-edit.page';
import { LogoutComponent } from './components/logout/logout.component';
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
import { ModalRankingComponent } from './modals/modal-ranking/modal-ranking.component';

//Native
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, ModalLoginPage, LogoutComponent, ModalRankingComponent, ModalEditPage, ModalEditInfoPage, EditComponent, ConfirmComponent],
  entryComponents: [AppComponent, ModalLoginPage, LogoutComponent, ModalRankingComponent, ModalEditPage, ModalEditInfoPage, EditComponent, ConfirmComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Toast,
    HomePage,
    Vibration,
    LocalNotifications,
    Camera,
    QRScanner,
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
