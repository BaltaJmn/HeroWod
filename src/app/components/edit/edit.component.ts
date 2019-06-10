import { FuncionesService } from './../../services/funciones.service';
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
  public idEjercicio: any = null;
  public ejerciciosDia: any;
  public ejercicioParaEditar: any;

  public titulo: String = 'Editando entrenamiento: '

  constructor(
    private userService: UsuarioService,
    private groupService: GrupoService,
    private workoutService: EntrenamientosService,
    private funciones: FuncionesService,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
  ) { 
    this.idEjercicio = this.navParams.get('id');

    if (this.idEjercicio == null) {
      this.titulo = 'Añadiendo entrenamiento: '
    }

    this.ejerciciosDia = this.workoutService.getEjercicios();
    this.ejercicioParaEditar = this.ejerciciosDia[this.idEjercicio]

    this.editFormGroup = this.formBuilder.group({
      ejercicioParaEditar: [this.ejercicioParaEditar, Validators.required]
    })
  }

  ngOnInit() {}

  /**
   * Dependiendo de los parámetros que reciba, carga el formulario con la información
   */
  loadData() {

    if ( this.idEjercicio == null){
      
      this.ejerciciosDia.push(this.editFormGroup.get("ejercicioParaEditar").value)

      let data = {
        numEntreno: this.workoutService.getNumeroEntrenamiento(),
        ejercicios: this.ejerciciosDia
      }

      this.workoutService.actualizarEntrenamiento(this.workoutService.getId(), data)

      this.funciones.hidePopover()

    } else {

      this.ejerciciosDia[this.idEjercicio] = this.editFormGroup.get("ejercicioParaEditar").value

      let data = {
        numEntreno: this.workoutService.getNumeroEntrenamiento(),
        ejercicios: this.ejerciciosDia
      }

      this.workoutService.actualizarEntrenamiento(this.workoutService.getId(), data);
    
      this.funciones.hidePopover()
    }
    
  }

  cerrarModal(){
    this.funciones.hideModal();
  }

}
