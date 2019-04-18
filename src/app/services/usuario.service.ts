import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from './../interfaces/Usuario';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosColeccion: any;
  usuario: Usuario = {};

  constructor(
    private fireStore: AngularFirestore,
  ) { 

    this.usuariosColeccion = fireStore.collection<any>(environment.firebaseConfig.usuarios);

    this.usuario.logged = false;
    this.usuario.id = "";
    this.usuario.usuario = "";
    this.usuario.contraseña = "";
    this.usuario.rol = "";
    this.usuario.dias = "";
    this.usuario.avatar = environment.defaultAvatar;
    this.usuario.grupo = "";

  }

  /**
   * Crea un usuario en la base de datos
   * @param datos Datos del usuario
   */
  crearUsuario(datos) {
    return this.usuariosColeccion.add(datos);
  }
}
