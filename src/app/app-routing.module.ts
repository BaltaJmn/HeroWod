import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'modal-login', loadChildren: './modals/modal-login/modal-login.module#ModalLoginPageModule' },
  { path: 'modal-edit', loadChildren: './modals/modal-edit/modal-edit.module#ModalEditPageModule' },
  { path: 'modal-edit-info', loadChildren: './modals/modal-edit-info/modal-edit-info.module#ModalEditInfoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
