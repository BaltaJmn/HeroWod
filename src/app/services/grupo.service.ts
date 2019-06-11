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
  x: any;
  aux: any;
  conjuntoGrupos: any;

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

  /**
   * Recupera el grupo en relación al usuario logeado
   */
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

  /**
   * Recupera la colección del grupo
   */
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

  /**
   * Devuelve la cantidad de grupos diferentes
   */
  getCantidadGrupos(){
    return new Promise((resolve) => {
      this.gruposColeccion.ref.get().then(snap => {
        let size = snap.size
          resolve(size)
        });
    });    
  }

  /**
   * Devuelve la cantidad de grupos disponibles
   * @param d Número de grupos
   */
  getDisponibilidadGrupos(d){
    return new Promise((resolve) => {
      for (var i = 0; i < d; i++) {
        this.indice.push(i)
        resolve(this.indice)
      }
    }); 
  }

  /**
   * Devuelve un array con los grupos disponibles
   */
  getGruposDisponibles(){
    this.conjuntoGrupos = [];
    this.aux;
    this.indice = [];

    return new Promise((resolve) => {
      this.getCantidadGrupos().then((d) => {
        this.getDisponibilidadGrupos(d).then(() => {
          this.conjuntoGrupos.length = 0;
          for (let numero of this.indice){
            this.gruposColeccion.ref.get().then((element) => {
  
              this.x = element.docs[numero].data()
  
              if(this.x.actual >= this.x.max){
                console.log('asdadsasasddasda')
              }else{
                this.aux = this.x.numeroGrupo;
                this.conjuntoGrupos.push(this.aux);
              }
            });
          }
        });
        resolve(this.conjuntoGrupos);
      })
    }); 
  }

  getEntrenamientos() {
    return this.grupo.entrenamientos;
  }

  /**
   * Devuelve el correspodiente entrenamiento según el día
   */
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
