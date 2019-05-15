import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntrenamientosService } from './../../services/entrenamientos.service';
import { GrupoService } from './../../services/grupo.service';
import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  public editFormGroup: FormGroup;
  private idEjercicio: any;
  private ejerciciosDia: any;
  private ejercicioParaEditar: any;

  constructor(
    private userService: UsuarioService,
    private groupService: GrupoService,
    private workoutService: EntrenamientosService,
    private navParams: NavParams,
    public formBuilder: FormBuilder,
  ) { 
    console.log('contructor')
    this.idEjercicio = this.navParams.get('id');
    this.ejerciciosDia = this.workoutService.getEjercicios();
    this.ejercicioParaEditar = this.ejerciciosDia[this.idEjercicio]

    this.editFormGroup = this.formBuilder.group({
      ejercicioParaEditar: [this.ejercicioParaEditar, Validators.required]
    })
  }

  ngOnInit() {}

  edit() {
    this.ejerciciosDia[this.idEjercicio] = this.editFormGroup.get("ejercicioParaEditar").value

    let data = {
      numEntreno: this.workoutService.getNumeroEntrenamiento(),
      ejercicios: this.ejerciciosDia
    }

    this.workoutService.actualizarEntrenamiento(this.workoutService.getId(), data);
  }

}
