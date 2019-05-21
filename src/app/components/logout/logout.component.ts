import { FuncionesService } from './../../services/funciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UsuarioService,
    private funciones: FuncionesService,
  ) { }

  ngOnInit() {}

  aceptar() {
    this.funciones.presentLoading();
    this.userService.cerrarSesion();
    this.funciones.hideMenu();
  }

  cancelar() {
    this.funciones.hidePopover();
  }

}
