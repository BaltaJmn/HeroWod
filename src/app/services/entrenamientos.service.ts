import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Entrenamiento } from '../interfaces/Entrenamiento';
import { environment } from 'src/environments/environment';
import { GrupoService } from './grupo.service';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {

  entrenamientosColeccion: any;
  entrenamiento: Entrenamiento = {};

  constructor(
    private fireStore: AngularFirestore,
    private groupService: GrupoService,
    private events: Events
  ) {
    this.entrenamientosColeccion = fireStore.collection<any>(environment.firebaseConfig.entrenamientos);

    this.entrenamiento.id = "";
    this.entrenamiento.numeroEntrenamiento = "";
    this.entrenamiento.ejercicios;

    /**
     * Evento que carga los entrenamientos una vez cargado el grupo del usuario
     */
    events.subscribe('loadWorkout', () => {
      this.recuperarEntrenamientosGrupo().then((d) => {
        d.forEach(t => {
          this.entrenamiento.id = t.id;
          this.entrenamiento.numeroEntrenamiento = t.data().numEntreno;
          this.entrenamiento.ejercicios = t.data().ejercicios;
        })
        this.events.publish('loadScreen')
      });
    })
   }

  /**
   * Método que recupera el entrenamiento relacionado con el grupo
   */
  recuperarEntrenamientosGrupo(){
    return this.entrenamientosColeccion.ref.where("numEntreno", "==", this.groupService.getEntrenamientoPorDia()).get();
  }

  /**
   * Método para actualizar los entrenamientos
   * @param id 
   * @param data 
   */
  actualizarEntrenamiento(id, data){
    return this.entrenamientosColeccion.doc(id).set(data);
  }

  /**
   * Devuelve el id del entrenamiento
   */
  getId() {
    return this.entrenamiento.id;
  }

  /**
   * Devuelve el número del entrenamiento
   */
  getNumeroEntrenamiento() {
    return this.entrenamiento.numeroEntrenamiento;
  }

  /**
   * Devuelve los ejercicios del entrenamiento
   */
  getEjercicios(){
    return this.entrenamiento.ejercicios
  }
}
