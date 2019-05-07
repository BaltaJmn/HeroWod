import { Events } from '@ionic/angular';
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

  logged: boolean = false;

  constructor(
    public userService: UsuarioService,
    public groupService: GrupoService,
    public events: Events
  ){
    events.subscribe('logged', () => {
      this.logged = true;      
      this.groupNumber = this.groupService.getNumeroGrupo();
      this.groupWorkout = this.groupService.getEntrenamientos();
      this.groupActualN = this.groupService.getActual();
      this.groupMaxN = this.groupService.getMax();
    });
  }
}
