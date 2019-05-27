import { Vibration } from '@ionic-native/vibration/ngx';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController, PopoverController, MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private popoverContoller: PopoverController,
    private menuController: MenuController,
    private vibration: Vibration
  ) { }

  /**
   * Método que muestra un toast
   * @param msg El mensaje del toast
   */
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Método que muestra el Loading
   */
  async presentLoading() {

    let myloading = await this.loadingController.create({
      message: "Cargando"
    });

    return await myloading.present();
  }

  /**
   * Método que oculta el Loading
   */
  hideLoading(){
    this.loadingController.dismiss();
  }

  /**
   * Método que oculta el Modal
   */
  hideModal(){
    this.modalController.dismiss();
  }

  /**
   * Método que oculta el Popover
   */
  hidePopover(){
    this.popoverContoller.dismiss();
  }

  /**
   * Método que oculta el Menu
   */
  hideMenu(){
    this.menuController.close();
  }

  /**
   * Método para hacer vibrar el dispositivo
   */
  vibrate(){
    this.vibration.vibrate(50);
  }
  
}
