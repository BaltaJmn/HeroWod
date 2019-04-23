import { UsuarioService } from 'src/app/services/usuario.service';
import { Grupo } from './../interfaces/Grupo';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  gruposColeccion: any;
  grupo: Grupo = {};

  constructor(
    private fireStore: AngularFirestore,
    private userService: UsuarioService
  ) { 
    this.gruposColeccion = fireStore.collection<any>(environment.firebaseConfig.grupos);

    this.grupo.id = "";
    this.grupo.numeroGrupo = ""
    this.grupo.entrenamientos = [];
    this.grupo.actual = "";
    this.grupo.max = "";
  }

  inicializarGrupo(){
    this.recuperarGrupoUsuario()
    .then((d) => {
      d.forEach(t => {

        this.grupo.id = t.id
        this.grupo.numeroGrupo = t.data().numeroGrupo
        this.grupo.entrenamientos = t.data().entrenamientos
        this.grupo.actual = t.data().actual
        this.grupo.max = t.data().max
        console.log(this.grupo)
      });
    });
  }

  crearGrupo() {
    let entrenamiento = {
      1: "asd",
      2: "123",
    }
    let data = {
      numeroGrupo: "5",
      entrenamientos: entrenamiento,
      actual: "1",
      max: "20"
    }
    return this.gruposColeccion.add(data);
  }

  recuperarGrupoUsuario() {
    this.grupo.numeroGrupo = this.userService.getGrupo()
    return this.gruposColeccion.ref.where("numeroGrupo", "==", this.grupo.numeroGrupo).get();
  }

  getId() {
    return this.grupo.id;
  }

  getNumeroGrupo() {
    return this.grupo.numeroGrupo;
  }

  getEntrenamientos() {
    return this.grupo.entrenamientos;
  }

  getActual() {
    return this.grupo.actual;
  }

  getMax() {
    return this.grupo.max;
  }
}
