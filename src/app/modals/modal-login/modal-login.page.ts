import { UsuarioService } from 'src/app/services/usuario.service';
import { GrupoService } from './../../services/grupo.service';
import { EntrenamientosService } from './../../services/entrenamientos.service';
import { FuncionesService } from './../../services/funciones.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController, Events } from '@ionic/angular';

/**
 * Formularios
 */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})

export class ModalLoginPage implements OnInit {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;

  //Swipe
  SwipedTabsIndicator: any = null;
  tabs = ["selectTab(0)", "selectTab(1)"];
  public category: any = "0";
  ntabs = 2;
  titulo: any = 'Iniciar Sesión';

  //Formularios
  public createUserFormGroup: FormGroup;
  public loginUserFormGroup: FormGroup;
  public adminCheckbox: Boolean = false;

  //Inicio Sesión
  public datosUsuario = [];

  admin: Boolean = false;
  logged: Boolean = false;

  constructor(
    public userService: UsuarioService,
    public groupService: GrupoService,
    public workoutService: EntrenamientosService,
    public funciones: FuncionesService,

    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public events: Events
  ) {
    this.createUserFormGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    })

    this.loginUserFormGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    })
  }

  ionViewWillEnter(){
    if (this.userService.isAdmin()){
      this.titulo = 'Crear Usuario'
    }
    this.admin = this.userService.isAdmin();
    this.logged = this.userService.isLogged();
  } 

  register(){

    let data = {
      usuario: this.createUserFormGroup.get("usuario").value,
      contraseña: this.createUserFormGroup.get("contraseña").value,
      admin: this.adminCheckbox,
      dias: 0,
      avatar: environment.defaultAvatar,
      grupo: "1"
    };

    this.funciones.presentLoading();

    this.userService.crearUsuario(data)
      .then(() => {
        this.createUserFormGroup.setValue({
          usuario: '',
          contraseña: ''
        });

        this.funciones.hideLoading();
        this.funciones.presentToast('Usuario creado correctamente')
      })
      .catch(() => {
        this.funciones.hideLoading();
        this.funciones.presentToast('No se ha podido crear el usuario deseado');
      });
    
  }

  login(){

    let data = {
      usuario: this.loginUserFormGroup.get("usuario").value,
      contraseña: this.loginUserFormGroup.get("contraseña").value,
    };

    this.funciones.presentLoading();

    this.userService.recuperarUsuarioID(data.usuario, data.contraseña)
      .then((d) => {

        if (d.empty == true) {

          this.funciones.hideLoading()

          this.funciones.presentToast("No se han encontrado usuarios");

        } else {

          let id = d.docs[0].id;
          this.datosUsuario = d.docs[0].data();
          this.userService.iniciarSesion(id, this.datosUsuario);

          if (this.userService.isLogged()) {

            this.groupService.inicializarGrupo()
            this.funciones.hideLoading()
            this.funciones.presentToast("Sesión iniciada correctamente");
            //this.vibration.vibrate(50);
          
          } else {

            this.funciones.hideLoading()
            this.funciones.presentToast("Problemas al iniciar sesión");
          
          }

        }
      });
  }

  ngOnInit() {
    this.SwipedTabsSlider.length().then(l => {
      this.ntabs = l;
    });
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  /**
   * Cierra el modal
   */
  cerrarModal() {
    this.modalController.dismiss();
  }

  //Slide

  /**
   * Actualiza la categoría que esté en ese momento activa
   * @param cat 
   */
  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category;
      if (this.category == 0) {
        this.titulo = "Iniciar Sesión";
      } else {
        this.titulo = "Crear Usuario";
      }
    });
  }

  /**
   * El método que permite actualizar el indicado cuando se cambia de slide
   */
  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {

      if (this.ntabs > i) {
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }

    });

  }

  /**
   * El método que anima la "rayita" mientras nos estamos deslizando por el slide
   * @param e 
   */
  animateIndicator(e) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
        ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
  }

}
