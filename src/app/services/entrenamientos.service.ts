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

  recuperarEntrenamientosGrupo(){
    return this.entrenamientosColeccion.ref.where("numEntreno", "==", this.groupService.getEntrenamientoPorDia()).get();
  }

   crearEntrenamiento() {
    let array = [
      "Comer",
      "Dormir",
    ]
    
    let data = {
      numEntreno: "0",
      ejercicios: array,
    }
    return this.entrenamientosColeccion.add(data);
  }

  actualizarEntrenamiento(id, data){
    return this.entrenamientosColeccion.doc(id).set(data);
  }

  getId() {
    return this.entrenamiento.id;
  }

  getNumeroEntrenamiento() {
    return this.entrenamiento.numeroEntrenamiento;
  }

  getEjercicios(){
    return this.entrenamiento.ejercicios
  }
}
