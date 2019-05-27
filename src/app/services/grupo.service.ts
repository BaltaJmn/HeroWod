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

  indice = [];

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
    this.grupo.horario = "";

    events.subscribe('loadGroup', () => {
      this.inicializarGrupo();
    });
  }

  inicializarGrupo(){
    this.recuperarGrupoUsuario().then((d) => {
      d.forEach(t => {
        this.grupo.id = t.id
        this.grupo.numeroGrupo = t.data().numeroGrupo
        this.grupo.entrenamientos = t.data().entrenamientos
        this.grupo.actual = t.data().actual
        this.grupo.max = t.data().max
        this.grupo.horario = t.data().horario
      })
      this.events.publish('loadWorkout')
    });
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

  getCantidadGrupos(){
    return new Promise((resolve) => {
      this.gruposColeccion.ref.get().then(snap => {
        let size = snap.size
          resolve(size)
        });
    });    
  }

  getDisponibilidadGrupos(d){
    return new Promise((resolve) => {
      for (var i = 0; i < d; i++) {
        this.indice.push(i)
        resolve(this.indice)
      }
    }); 
  }

  getGruposDisponibles(){
    let conjuntoGrupos = [];
    let aux;

    return new Promise((resolve) => {
      this.getCantidadGrupos().then((d) => {
        this.getDisponibilidadGrupos(d).then(() => {
          for (let numero of this.indice){
            this.gruposColeccion.ref.get().then((element) => {
  
              let x = element.docs[numero].data()
  
              if(x.actual >= x.max){
                console.log('asdadsasasddasda')
              }else{
                aux = x.numeroGrupo;
                conjuntoGrupos.push(aux);
              }
  
            });
          }
        });
        resolve(conjuntoGrupos);
      })
    }); 
  }

  getEntrenamientos() {
    return this.grupo.entrenamientos;
  }

  getEntrenamientoPorDia(){
    const f: Date = new Date();
    return this.grupo.entrenamientos[f.getDay()]
  }

  getActual() {
    return this.grupo.actual;
  }

  getMax() {
    return this.grupo.max;
  }

  getHorario(){
    return this.grupo.horario;
  }
}
