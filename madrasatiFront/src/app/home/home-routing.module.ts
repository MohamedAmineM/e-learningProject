import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';






const routes: Routes = [
  { path: '', component: HomeComponent,
  children: [
    {
      path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      data: {preload: true, delay: false}
    },

      {path: '**', redirectTo: ''}
  ]}
  
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  
  })
  export class HomeRoutingModule { }