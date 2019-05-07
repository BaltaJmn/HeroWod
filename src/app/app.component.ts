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

  userName: String = "";

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
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async mostrarModalLogin() {
    const modal = await this.modalController.create({
      component: ModalLoginPage
    });
    return await modal.present();
  }
}
