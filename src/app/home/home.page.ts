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
    public events: Events,
    public modalController: ModalController
  ){
    events.subscribe('loadScreen', () => {
      this.logged = this.userService.isLogged(); 
      this.admin = this.userService.isAdmin();  
         
      this.groupNumber = this.groupService.getNumeroGrupo();
      this.groupWorkout = this.workoutService.getEjercicios();
      this.groupActualN = this.groupService.getActual();
      this.groupMaxN = this.groupService.getMax();
      this.modalController.dismiss();
    });
  }

  async mostrarModalEdit() {
    const modal = await this.modalController.create({
      component: ModalEditPage
    });
    return await modal.present();
  }

  prueba(){
    this.workoutService.crearEntrenamiento()
  }
}
