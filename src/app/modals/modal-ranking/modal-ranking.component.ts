import { FuncionesService } from './../../services/funciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-ranking',
  templateUrl: './modal-ranking.component.html',
  styleUrls: ['./modal-ranking.component.scss'],
})
export class ModalRankingComponent implements OnInit {

  listadoRanking: any = [];
  listadoHTML: any = [];
  top1Avatar = null;
  top1Usuario = null;

  constructor(
    private userService: UsuarioService,
    private funciones: FuncionesService
  ) { }

  ngOnInit() {
    this.updateRanking(null);
  }

  updateRanking(event?) {

    this.listadoRanking = [];

    this.funciones.presentLoading();

    this.userService.getRanking().then(d => {

      d.forEach((u) => {
        this.listadoRanking.push(u);
      });

      this.listadoHTML = this.listadoRanking;

      this.top1Avatar = this.listadoRanking[0].avatar;
      this.top1Usuario = this.listadoRanking[0].usuario;

      this.funciones.hideLoading();

      event.target.complete();
    });
  }

  //SEARCH BAR

  /**
   * Carga los datos y los vuelca en un array
   */
  initializeItems() {
    this.listadoHTML = this.listadoRanking;
  }

  /**
   * Va buscando entre los objetos que coincidan con lo introducido por parámetro
   * @param ev Escritura en el formulario
   */
  getItems(ev: any) {
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listadoHTML = this.listadoRanking.filter((item) => {
        return (item.usuario.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  cerrarModal() {
    this.funciones.hideModal();
  }
}
