import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ModalRankingComponent } from './modals/modal-ranking/modal-ranking.component';
import { FuncionesService } from './services/funciones.service';
import { LogoutComponent } from './components/logout/logout.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GrupoService } from './services/grupo.service';
import { ModalLoginPage } from './modals/modal-login/modal-login.page';
import { Component } from '@angular/core';

import { Platform, ModalController, Events, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { EntrenamientosService } from './services/entrenamientos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  username: String = "";
  dias: any = 0;
  descuento: any;
  avatar: String = "";
  grupo: String = "";

  logged: Boolean = false;
  admin: Boolean = false;

  //QR
  scanSub: any;

  constructor(
    private userService: UsuarioService,
    private groupService: GrupoService,
    private workoutService: EntrenamientosService,

    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    
    private funciones: FuncionesService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private events: Events,
    private qrScanner: QRScanner,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();

    events.subscribe('loadScreen', () => {
      this.logged = this.userService.isLogged(); 
      this.admin = this.userService.isAdmin();  
      this.username = this.userService.getUsuario();  
      this.dias = this.userService.getDias();
      this.avatar = this.userService.getAvatar();
      this.grupo = this.userService.getGrupo();  

      this.descuento = parseInt(this.dias) * 10 / 100;
    });

    events.subscribe('updateDay', () => {
      this.dias = this.userService.getDias()
      this.descuento = parseInt(this.dias) * 10 / 100;
      this.funciones.presentToast('¡Día Sumado!')
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewWillEnter() {
    this.avatar = this.userService.getAvatar();
  }

  scanQR() {
    this.funciones.hideMenu()
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        //Cámara preparada
        if (status.authorized) {
          this.qrScanner.show();  //Mostramos cámara
          window.document.querySelector('ion-app').classList.add('cameraView');  //ocultamos vista de la app

          this.scanSub = this.qrScanner.scan().subscribe((d) => {

            if (d == "suma") {
              this.userService.updateDay()
            } else {
              this.funciones.presentToast("Código incorrecto");
            }

            this.ngOnDestroy()
          });
        } else if (status.denied) {
          this.funciones.presentToast("No hay permisos");
          this.qrScanner.openSettings();
        } else {
          this.funciones.presentToast("No hay permisos");
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ngOnDestroy() {
    window.document.querySelector('ion-app').classList.remove('cameraView');
    this.qrScanner.hide().then(() => {
      this.qrScanner.destroy();
    });
  } 

  async mostrarModalLogin() {
    this.funciones.hideMenu();
    const modal = await this.modalController.create({
      component: ModalLoginPage
    });
    modal.onDidDismiss().then(() => {

      let comprobacion = this.workoutService.getEjercicios();
      
      if(comprobacion[0] == 'Descanso'){
        this.localNotifications.schedule({
          id: 1,
          text: 'Eres libre, no hay entreno',
          led: 'FF0000',
        });
      } else {
        this.localNotifications.schedule({
          id: 1,
          text: 'Hoy toca entreno a las ' + this.groupService.getHorario() + ' horas',
          led: 'FF0000',
        });
      }
    });
    return await modal.present();
  }

  async mostrarModalRanking() {
    const modal = await this.modalController.create({
      component: ModalRankingComponent
    });
    return await modal.present();
  }

  async mostrarPopoverLogout() {
    const popover = await this.popoverController.create({
      component: LogoutComponent,
      translucent: true
    });
    popover.onDidDismiss().then(() => {
      this.logged = this.userService.isLogged();
      this.admin = this.userService.isAdmin();
      this.avatar = this.userService.getAvatar();
      this.funciones.hideLoading()
    });
    return await popover.present();
  }

  async mostrarActualizarFoto() {
    const popover = await this.popoverController.create({
      component: ConfirmComponent,
      translucent: true
    });
    popover.onDidDismiss().then(() => {

      this.avatar = this.userService.getAvatar();
      this.funciones.presentToast('Imagen actualizada correctamente')

    });
    return await popover.present();
  }
}
