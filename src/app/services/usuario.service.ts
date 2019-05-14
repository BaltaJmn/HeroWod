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
    this.usuario.admin = false;
    this.usuario.dias = "";
    this.usuario.avatar = environment.defaultAvatar;
    this.usuario.grupo = "";

  }

  crearUsuario(datos) {
    return this.usuariosColeccion.add(datos);
  }

  recuperarUsuarioID(usuario, contraseña) {
    return this.usuariosColeccion.ref.where("usuario", "==", usuario).where("contraseña", "==", contraseña).get();
  }

  iniciarSesion(id, datosUsuario) {

    this.usuario = datosUsuario;

    this.usuario.logged = true;

    this.usuario.id = id;

    this.usuario.dias = datosUsuario.dias;

    //this.storage.set('datosSesion', this.datosSesion);
  }

  cerrarSesion() {
    return new Promise((resolve, reject) => {
      this.usuario.logged = false;
      this.usuario.id = "";
      this.usuario.usuario = "";
      this.usuario.contraseña = "";
      this.usuario.admin = false;
      this.usuario.dias = "";
      this.usuario.avatar = environment.defaultAvatar;
      this.usuario.grupo = "";
    });
  }

  getRanking(): Promise<Usuario[]> {

    console.log(this.usuario.usuario);

    return new Promise((resolve) => {

      let lreq: Usuario[] = [];
      let query;

      query = this.usuariosColeccion.ref.orderBy("dias", "desc").get()

      query.then((d) => {

        d.forEach((u) => {
          let x = { "id": u.id, ...u.data() };
          lreq.push(x);
        });

        resolve(lreq);
      });
    });
  }

  isLogged(): Boolean {
    return this.usuario.logged;
  }

  isAdmin(): Boolean {
    return this.usuario.admin;
  }


  getId() {
    return this.usuario.id;
  }

  getUsuario() {
    return this.usuario.usuario;
  }

  getContraseña() {
    return this.usuario.contraseña;
  }

  getDias() {
    return this.usuario.dias;
  }

  getAvatar() {
    return this.usuario.avatar;
  }

  getGrupo() {
    return this.usuario.grupo;
  }
}
