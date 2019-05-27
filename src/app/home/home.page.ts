import { ModalEditPage } from './../modals/modal-edit/modal-edit.page';
import { EntrenamientosService } from './../services/entrenamientos.service';
import { FuncionesService } from './../services/funciones.service';
import { Events, ModalController } from '@ionic/angular';
import { GrupoService } from './../services/grupo.service';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  groupNumber: any = "";
  groupWorkout: any = [];
  workoutsLength:any;
  groupActualN: any = "";
  groupMaxN: any = "";

  logged: Boolean = false;
  admin: Boolean = false;

  constructor(
    public userService: UsuarioService,
    public groupService: GrupoService,
    public workoutService: EntrenamientosService,
    public funciones: FuncionesService,
    public events: Events,
    public modalController: ModalController
  ){
    /**
     * Evento que carga toda la información una vez se ha iniciado sesión
     */
    events.subscribe('loadScreen', () => {
      this.logged = this.userService.isLogged(); 
      this.admin = this.userService.isAdmin();  
         
      this.groupNumber = this.groupService.getNumeroGrupo();
      this.groupWorkout = this.workoutService.getEjercicios();
      this.groupActualN = this.groupService.getActual();
      this.groupMaxN = this.groupService.getMax();
      this.modalController.dismiss();
      this.funciones.hideLoading()
      this.funciones.presentToast("Sesión iniciada correctamente");
      this.funciones.vibrate();
    });

    /**
     * Evento que refresca información una vez cerrada sesión
     */
    events.subscribe('logout', () => {
      this.logged = this.userService.isLogged(); 
      this.admin = this.userService.isAdmin();
      this.funciones.hidePopover();
      this.funciones.hideLoading();
    });
  }

  /**
   * Muestra el modal Editar
   */
  async mostrarModalEdit() {
    const modal = await this.modalController.create({
      component: ModalEditPage
    });
    return await modal.present();
  }
}
