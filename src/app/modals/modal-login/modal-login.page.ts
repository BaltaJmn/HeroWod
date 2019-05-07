import { GrupoService } from './../../services/grupo.service';
import { FuncionesService } from './../../services/funciones.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController, Events } from '@ionic/angular';

/**
 * Formularios
 */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';


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
  titulo: any = "Iniciar Sesión";

  //Formularios
  public createUserFormGroup: FormGroup;
  public loginUserFormGroup: FormGroup;

  //Inicio Sesión
  public datosUsuario = [];

  constructor(
    public userService: UsuarioService,
    public groupService: GrupoService,
    public funcionesService: FuncionesService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public events: Events
  ) {
    this.createUserFormGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    })

    this.loginUserFormGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    })
  }

  register(){

    /* Reune los datos del formulario */
    let data = {
      usuario: this.createUserFormGroup.get("usuario").value,
      contraseña: this.createUserFormGroup.get("contraseña").value,
      rol: "user",
      dias: 0,
      avatar: environment.defaultAvatar,
      grupo: "1"
    };

    this.userService.crearUsuario(data);
    
  }

  login(){

    /* Reune los datos del formulario */
    let data = {
      usuario: this.loginUserFormGroup.get("usuario").value,
      contraseña: this.loginUserFormGroup.get("contraseña").value,
    };

    /* Comprueba que el usuario existe */
    this.userService.recuperarUsuarioID(data.usuario, data.contraseña)
      .then((d) => {

        if (d.empty == true) {

          //this.loadingController.dismiss();

          //this.funcionesService.mostrarToast("No se han encontrado usuarios");

        } else {

          let id = d.docs[0].id;
          this.datosUsuario = d.docs[0].data();
          this.userService.iniciarSesion(id, this.datosUsuario);

          //this.loadingController.dismiss();

          if (this.userService.isLogged()) {
            this.groupService.inicializarGrupo()
            //this.funcionesService.mostrarToast("Sesión iniciada correctamente");
            //this.vibration.vibrate(50);
            //this.funcionesService.mostrarToast("Estás logeado");
            //this.modalController.dismiss()

          } else {

            //this.funcionesService.mostrarToast("Problemas al iniciar sesión");

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

  //Loading

  /**
   * Muestra el loading en pantalla 
   * @param msg El texto que se muestra en el loading
   */
  async presentLoading(msg) {

    let myloading = await this.loadingController.create({
      message: msg
    });

    return await myloading.present();
  }

  /**
   * Finaliza el loading
   */
  finishLoading() {
    this.loadingController.dismiss();
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
