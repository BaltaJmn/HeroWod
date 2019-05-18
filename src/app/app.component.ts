import { ConfirmComponent } from './components/confirm/confirm.component';
import { ModalRankingComponent } from './modals/modal-ranking/modal-ranking.component';
import { FuncionesService } from './services/funciones.service';
import { LogoutComponent } from './components/logout/logout.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GrupoService } from './services/grupo.service';
import { HomePage } from './home/home.page';
import { ModalLoginPage } from './modals/modal-login/modal-login.page';
import { Component } from '@angular/core';

import { Platform, ModalController, Events, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UsuarioService,
    private groupService: GrupoService,
    private funciones: FuncionesService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private homePage: HomePage,
    private events: Events
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

  async mostrarModalLogin() {
    const modal = await this.modalController.create({
      component: ModalLoginPage
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
