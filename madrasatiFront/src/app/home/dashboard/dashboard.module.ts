import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { BoardAdminComponent } from '../../shared/board-admin/board-admin.component';
import { BoardUserComponent } from '../../shared/board-user/board-user.component';
import { BoardModeratorComponent } from '../../shared/board-moderator/board-moderator.component';



@NgModule({
  declarations: [DashboardComponent,],
  imports: [
    CommonModule,
    SharedModule,
    BoardUserComponent,
    RouterModule.forChild([
      {
        path: '', component: DashboardComponent
      }
    ]
  ),
  ]
})
export class DashboardModule { }
