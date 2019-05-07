import { UsuarioService } from 'src/app/services/usuario.service';
import { GrupoService } from './services/grupo.service';
import { HomePage } from './home/home.page';
import { ModalLoginPage } from './modals/modal-login/modal-login.page';
import { Component } from '@angular/core';

import { Platform, ModalController, Events } from '@ionic/angular';
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

  logged: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private homePage: HomePage,
    private groupService: GrupoService,
    private userService: UsuarioService,
    private events: Events
  ) {
    this.initializeApp();

    events.subscribe('logged', () => {
      this.logged = true;
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

  ionViewDidEnter() {
    this.avatar = this.userService.getAvatar();
    this.descuento
  }

  async mostrarModalLogin() {
    const modal = await this.modalController.create({
      component: ModalLoginPage
    });
    return await modal.present();
  }
}
