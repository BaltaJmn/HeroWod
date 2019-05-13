import { FuncionesService } from './../../services/funciones.service';
import { PopoverController } from '@ionic/angular';
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
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  aceptar() {
    this.funciones.presentLoading();
    this.userService.cerrarSesion();
    this.popoverController.dismiss();
  }

  cancelar() {
    this.popoverController.dismiss()
  }

}
