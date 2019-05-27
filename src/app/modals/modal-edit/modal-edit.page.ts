import { FuncionesService } from './../../services/funciones.service';
import { EditComponent } from './../../components/edit/edit.component';
import { EntrenamientosService } from './../../services/entrenamientos.service';
import { GrupoService } from './../../services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {

  private ejerciciosDia: any;

  constructor(
    private userService: UsuarioService,
    private groupService: GrupoService,
    private workoutService: EntrenamientosService,
    private popoverController: PopoverController,
    private funciones: FuncionesService
  ) { 
    this.ejerciciosDia = this.workoutService.getEjercicios()
  }

  ngOnInit() {}

  /**
   * Muestra el componente para añadir un entrenamiento
   */
  async mostrarPopoverAdd(i=null) {
    const popover = await this.popoverController.create({
      component: EditComponent,
      componentProps: {id:i},
      translucent: true
    }); 
    popover.onDidDismiss().then(() => {
      this.ejerciciosDia = this.workoutService.getEjercicios();
    });
    return await popover.present();
  }

  /**
   * Método para borrar un entrenamiento del array
   * @param i Posición del entrenamiento a borrar
   */
  deleteEntrenamiento(i){
    this.ejerciciosDia.splice(i, 1);

    let data = {
      numEntreno: this.workoutService.getNumeroEntrenamiento(),
      ejercicios: this.ejerciciosDia
    }

    this.workoutService.actualizarEntrenamiento(this.workoutService.getId(), data);
  }

  /**
   * Función que cierra el modal
   */
  cerrarModal() {
    this.funciones.hideModal();
  }

}
