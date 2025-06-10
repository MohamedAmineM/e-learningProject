import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';

@NgModule({
  declarations: [HeaderComponent,BoardAdminComponent,BoardModeratorComponent],

  imports: [

    FormsModule,ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

  ],
  exports:[ 
    HeaderComponent,BoardAdminComponent,BoardModeratorComponent
    ],
})
export class SharedModule { }
