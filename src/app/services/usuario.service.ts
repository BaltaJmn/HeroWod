import { Events } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from './../interfaces/Usuario';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosColeccion: any;
  usuario: Usuario = {};

  constructor(
    private fireStore: AngularFirestore,
    private events: Events,
    private camera: Camera
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

  updateProfilePhoto() {
    return new Promise((resolve, reject) => {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,  /*FILE_URI */
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: 0,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        targetWidth: 200
      };

      let data = {
        admin: this.usuario.admin,
        avatar: this.usuario.avatar,
        contraseña: this.usuario.contraseña,
        dias: this.usuario.dias,
        grupo: this.usuario.grupo,
        usuario: this.usuario.usuario, 
      };

      this.camera.getPicture(options)
        .then((imageData) => {
          let base64Image = 'data:image/jpeg;base64, ' + imageData;
          data.avatar = base64Image;

          this.setAvatar(data.avatar);

          this.usuariosColeccion.ref.where("usuario", "==", data.usuario).get()
            .then((d) => {
              this.usuariosColeccion.doc(d.docs[0].id).update(data).then(() => {
                resolve();
              });
            });
        });
    });
  }

  searchUser(user){
    return this.usuariosColeccion.ref.where("usuario", "==", user).get()
  }

  searchCurrentUser(){
    return this.usuariosColeccion.ref.where("usuario", "==", this.usuario).get()
  }

  updateDataUser(data){
    return this.usuariosColeccion.ref.where("usuario", "==", this.usuario).get()
      .then((d) => {
        this.usuariosColeccion.doc(d.docs[0].id).update(data);
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

  setAvatar(val){
    this.usuario.avatar = val;
  }

  getAvatar() {
    return this.usuario.avatar;
  }

  getGrupo() {
    return this.usuario.grupo;
  }
}
