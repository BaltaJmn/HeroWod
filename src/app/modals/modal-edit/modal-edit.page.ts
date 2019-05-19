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
  ) { 
    this.ejerciciosDia = this.workoutService.getEjercicios()
  }

  ngOnInit() {}

  async mostrarPopoverLogout(i=null) {
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

}
