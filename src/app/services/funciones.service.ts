import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(
    private toast: Toast,
    private loadingController: LoadingController,
    public toastController: ToastController
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
    this.loadingController.dismiss()
  }
  
}
