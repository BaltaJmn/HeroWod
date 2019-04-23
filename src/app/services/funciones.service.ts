import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(
    private toast: Toast
  ) { }

  mostrarToast(msg){
    return this.toast.show(msg, '5000', 'center')
  }
  
}
