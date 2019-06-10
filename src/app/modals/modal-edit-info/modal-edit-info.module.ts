import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalEditInfoPage } from './modal-edit-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalEditInfoPage]
})
export class ModalEditInfoPageModule {}
