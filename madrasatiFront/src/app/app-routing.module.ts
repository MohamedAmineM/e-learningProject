import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  

  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {preload: true, delay: false}
  },
  {
    path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    data: {preload: true, delay: false}
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {preload: true, delay: false}
  },
  {
    path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {preload: true, delay: false}
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }