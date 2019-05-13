import { EntrenamientosService } from './entrenamientos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Grupo } from './../interfaces/Grupo';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  gruposColeccion: any;
  grupo: Grupo = {};
  preparado: any = {};

  constructor(
    private fireStore: AngularFirestore,
    private userService: UsuarioService,
    private events: Events
  ) { 
    this.gruposColeccion = fireStore.collection<any>(environment.firebaseConfig.grupos);

    this.grupo.id = "";
    this.grupo.numeroGrupo = ""
    this.grupo.entrenamientos;
    this.grupo.actual = "";
    this.grupo.max = "";
  }

  inicializarGrupo(){
    this.recuperarGrupoUsuario().then((d) => {
      d.forEach(t => {
        this.grupo.id = t.id
        this.grupo.numeroGrupo = t.data().numeroGrupo
        this.grupo.entrenamientos = t.data().entrenamientos
        this.grupo.actual = t.data().actual
        this.grupo.max = t.data().max
      })
      this.events.publish('loadWorkout')
    });
  }

  crearGrupo() {
    let diasParaEntrenar = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ]
    
    let data = {
      numeroGrupo: "6",
      entrenamientos: diasParaEntrenar,
      actual: "1",
      max: "20"
    }
    return this.gruposColeccion.add(data);
  }

  recuperarGrupoUsuario() {
    this.grupo.numeroGrupo = this.userService.getGrupo()
    return this.gruposColeccion.ref.where("numeroGrupo", "==", this.grupo.numeroGrupo).get();
  }

  getGrupo(){
    return this.grupo;
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

  getEntrenamientoPorDia(){
    const f: Date = new Date();
    return this.grupo.entrenamientos[f.getDay() - 1]
  }

  getActual() {
    return this.grupo.actual;
  }

  getMax() {
    return this.grupo.max;
  }
}
