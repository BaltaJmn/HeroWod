import { FuncionesService } from './../../services/funciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  constructor(
    private userService: UsuarioService,
    private funciones: FuncionesService
  ) { }

  ngOnInit() {}

  aceptar() {
    this.userService.updateProfilePhoto().then(() => {
      this.funciones.hidePopover();
    });
  }

  cancelar() {
    this.funciones.hidePopover();
  }

}
