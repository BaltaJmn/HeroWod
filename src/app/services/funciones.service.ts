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
    private menuController: MenuController
  ) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {

    let myloading = await this.loadingController.create({
      message: "Cargando"
    });

    return await myloading.present();
  }

  hideLoading(){
    this.loadingController.dismiss();
  }

  hideModal(){
    this.modalController.dismiss();
  }

  hidePopover(){
    this.popoverContoller.dismiss()
  }

  hideMenu(){
    this.menuController.close()
  }
  
}
