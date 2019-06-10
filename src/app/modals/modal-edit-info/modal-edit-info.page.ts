import { GrupoService } from './../../services/grupo.service';
import { FuncionesService } from './../../services/funciones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-edit-info',
  templateUrl: './modal-edit-info.page.html',
  styleUrls: ['./modal-edit-info.page.scss'],
})
export class ModalEditInfoPage implements OnInit {

  public editUserFormGroup: FormGroup;

  constructor(
    public userService: UsuarioService,
    public groupService: GrupoService,
    public funciones: FuncionesService,
    public formBuilder: FormBuilder,
  ) {
    this.editUserFormGroup = this.formBuilder.group({
      usuario: [this.userService.getUsuario(), Validators.required],
      contraseña: [this.userService.getContraseña(), Validators.required],
    })
  }

  ngOnInit() {
  }

  editInfo() {
    this.funciones.presentLoading();

    let datosUsuario;

    let data = {
      admin: this.userService.isAdmin(),
      avatar: this.userService.getAvatar(),
      contraseña: this.editUserFormGroup.get("contraseña").value,
      dias: this.userService.getDias(),
      grupo: this.userService.getGrupo(),
      usuario: this.editUserFormGroup.get("usuario").value
    }

    this.userService.updateDataUser(this.userService.getId(), data);

    this.userService.recuperarUsuarioID(data.usuario, data.contraseña)
      .then((d) => {
        if (d.empty == true) {

          this.funciones.hideLoading()
          this.funciones.presentToast("No se han encontrado usuarios");

        } else {

          let id = d.docs[0].id;
          datosUsuario = d.docs[0].data();
          this.userService.iniciarSesion(id, datosUsuario);

          if (this.userService.isLogged()) {

            this.groupService.inicializarGrupo()
            this.funciones.hideModal();
          
          } else {

            this.funciones.hideLoading()
            this.funciones.presentToast("Problemas al iniciar sesión");
          
          }

        }
      });
  }

}
