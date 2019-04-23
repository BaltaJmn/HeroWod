import { GrupoService } from './../services/grupo.service';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  array = [];

  constructor(
    public userService: UsuarioService,
    public groupService: GrupoService
  ){}

  prueba(){
    this.groupService.recuperarGrupoUsuario()
      .then((d) => {
        d.forEach(t => {
          this.array.push({ 'data': t.data()});
        });
      });
  }
}
